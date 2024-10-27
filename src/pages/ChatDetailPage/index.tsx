import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  increment,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { db, storage } from "../../firebase";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CustomLoadingButton from "../../components/comman/CustomLoadingButton";
import { PhotoCamera } from "@mui/icons-material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ChatList = () => {
  const { chatId, recipientId } = useParams();
  const userSlice = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState<any>({}); // Store user details keyed by userId
  const [image, setImage] = useState<File | null>(null); // State for the selected image file
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  console.log(userDetails);

  // Fetch messages based on selected chatId
  useEffect(() => {
    if (chatId) {
      const messagesQuery = query(
        collection(db, "userChats", chatId, "messages")
      );
      const chatDocRef = doc(db, "userChats", chatId);

      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        updateDoc(chatDocRef, {
          [`unreadCount.${userSlice.user?._id}`]: 0, // Reset unread count to zero
        });
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedMessages = messageData.sort(
          (a: any, b: any) => a.timestamp.toMillis() - b.timestamp.toMillis()
        );
        setMessages(sortedMessages);
      });

      return () => unsubscribeMessages();
    }
  }, [chatId]);

  useEffect(() => {
    // Fetch user details for all sender IDs in the messages
    const fetchUserDetails = async () => {
      const senderIds = [...new Set(messages.map((msg) => msg.senderId))]; // Unique sender IDs

      const userPromises = senderIds.map(async (senderId) => {
        const userDoc = await getDoc(doc(db, "users", senderId));
        return userDoc.exists() ? { id: senderId, ...userDoc.data() } : null;
      });

      const users = await Promise.all(userPromises);
      const validUsers = users.filter((user) => user !== null);
      const userMap = validUsers.reduce((acc: any, user: any) => {
        acc[user.id] = user; // Map user details by userId
        return acc;
      }, {});
      console.log(userMap);
      setUserDetails(userMap); // Store user details in state
    };

    if (messages.length > 0) {
      fetchUserDetails();
    }
  }, [messages]);

  // Function to send a message
  const sendMessage = async () => {
    if (message.trim() === "" || !chatId) return;
    let imageUrl = null;
    if (image) {
      const imageRef = ref(storage, `chatImages/${chatId}/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const chatDocRef = doc(db, "userChats", (await chatId).toString());

    // Reference to the messages sub-collection within the chat
    const messagesCollectionRef = collection(
      db,
      "userChats",
      (await chatId).toString(),
      "messages"
    );

    const newMessageRef = doc(messagesCollectionRef); // Creates a new document reference

    await setDoc(newMessageRef, {
      senderId: userSlice.user?._id,
      text: message,
      timestamp: serverTimestamp(),
      readBy: [userSlice.user?._id],
      imageUrl, // Include the image URL if uploaded
    });

    await updateDoc(chatDocRef, {
      lastMessage: {
        text: message,
        senderId: userSlice.user?._id,
        timestamp: serverTimestamp(),
      },
      [`unreadCount.${recipientId}`]: increment(1),
    });

    setMessage("");
    handleRemoveImage(); // Clear the image preview
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null); // Clear the image preview
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: 2, borderTop: "1px solid #ccc" }}>
        <List
          sx={{
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
            marginBottom: 2,
          }}
        >
          {messages.map((msg) => {
            // const senderDetail = userDetails[msg.senderId]; // Get sender details from userDetails state

            // Determine if the message is from the current user or the recipient
            const isCurrentUser = msg.senderId === userSlice.user?._id;

            return (
              <ListItem
                key={msg.id}
                style={{
                  justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: isCurrentUser ? "#FF445E" : "grey.300", // Change background color based on sender
                    color: isCurrentUser ? "white" : "black",
                    borderRadius: 2,
                    padding: 1,
                    maxWidth: "70%", // Limit the width of the message bubble
                    textAlign: isCurrentUser ? "right" : "left", // Text alignment
                  }}
                >
                  <ListItemText
                    primary={msg.text}
                    // secondary={
                    //   senderDetail ? senderDetail.fullName : msg.senderId
                    // }
                    secondary={
                      msg.timestamp?.seconds
                        ? formatDistanceToNow(
                            new Date(msg.timestamp?.seconds * 1000)
                          ) + " ago"
                        : ""
                    }
                    sx={{ margin: 0 }} // Remove default margin
                  />
                  {msg.imageUrl && (
                    <Box
                      component={"img"}
                      src={msg.imageUrl}
                      alt="chat attachment"
                      style={{ maxWidth: "200px" }}
                    />
                  )}
                </Box>
              </ListItem>
            );
          })}
        </List>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {image && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            {image && (
              <CustomLoadingButton
                sx={{ height: "40px" }}
                onClick={handleRemoveImage}
              >
                Remove Image
              </CustomLoadingButton>
            )}
            {imagePreview && (
              <Box
                mt={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Typography variant="caption">
                  Selected Image Preview:
                </Typography>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{ width: 100, height: "auto", mt: 1, borderRadius: 1 }}
                />
              </Box>
            )}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <CustomLoadingButton
            sx={{ minWidth: "120px", height: "45px" }}
            type="button"
            onClick={sendMessage}
            disabled={!message}
          >
            Send
          </CustomLoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatList;
