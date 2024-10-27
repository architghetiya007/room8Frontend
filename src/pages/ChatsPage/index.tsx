import {
  Avatar,
  Box,
  Container,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns"; // Import date-fns for time formatting
import {
  query,
  collection,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { RootState } from "../../store";
import { Outlet, useNavigate } from "react-router-dom";

const ChatsPage: React.FC = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChatUsers = () => {
      const chatQuery = query(
        collection(db, "userChats"),
        where("userIds", "array-contains", userSlice.user?._id.toString())
      );

      const unsubscribe = onSnapshot(chatQuery, async (snapshot) => {
        const userIds = new Set<string>();

        // Loop through each chat to find the other participant's ID
        snapshot.docs.forEach((chatDoc) => {
          const chatData = chatDoc.data() as { userIds: string[] }; // Type assertion for chat data
          chatData.userIds.forEach((userId) => {
            if (userId !== userSlice.user?._id.toString()) {
              userIds.add(userId); // Add the other user's ID to the set
            }
          });
        });

        console.log(userIds);

        // Fetch the details of unique users from the `users` collection
        const uniqueUserData = await Promise.all(
          Array.from(userIds).map(async (userId) => {
            const userDoc = await getDoc(doc(db, "users", userId));
            return userDoc.exists()
              ? ({ id: userId, ...userDoc.data() } as any)
              : null; // Type assertion for User
          })
        );

        // Filter out any null user data
        const validUsers = uniqueUserData.filter((user) => user !== null);

        // Create a mapping of userId to the associated thread data using the snapshot docs
        const threadDataMap: Record<string, any> = {}; // Map to hold userId to thread data

        snapshot.docs.forEach((chatDoc) => {
          const chatData = chatDoc.data(); // Adjust this based on your actual fields
          const threadId = chatDoc.id; // Use document ID as threadId
          const threadInfo = {
            id: threadId,
            chatData,
            threadId,
            // ... add other fields from chatData if needed
          };

          chatData.userIds.forEach((userId: any) => {
            // Only set thread data if it hasn't been set yet for the userId
            if (!threadDataMap[userId]) {
              threadDataMap[userId] = threadInfo; // Assign the complete thread info for the user
            }
          });
        });

        // Combine user data with their corresponding thread data
        const usersWithThreadData = validUsers.map((user) => ({
          ...user,
          threadData: threadDataMap[user.id].chatData || null, // Assign thread data or null if not found
          threadId: threadDataMap[user.id].threadId || null,
        }));

        console.log(usersWithThreadData, "users");
        setChatUsers(usersWithThreadData); // Set the state with user data including thread data
      });

      return unsubscribe;
    };

    const unsubscribe = fetchChatUsers();

    return () => unsubscribe();
  }, [userSlice.user?._id]);

  const filterChats = chatUsers.filter((item) => {
    return item.fullName.toString().toLowerCase().includes(searchText);
  });
  return (
    <Box>
      <Container>
        <Typography
          sx={{
            fontSize: "50px",
            background:
              "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          mb={2}
        >
          Chats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OutlinedInput
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="Search By Name"
                />
              </Grid>
              {filterChats.map((item) => {
                return (
                  <Grid key={item} item xs={12} px={2} py={1}>
                    <Stack
                      onClick={() => navigate(`${item.threadId}/${item.id}`)}
                      direction={"row"}
                      spacing={3}
                    >
                      {item.profilePic ? (
                        <Avatar src={item.profilePic}></Avatar>
                      ) : (
                        <Avatar>{item.fullName.charAt(0)}</Avatar>
                      )}

                      <Stack direction={"column"} flex={1}>
                        <Typography variant="h6">{item.fullName}</Typography>
                        <Typography variant="subtitle1">
                          {item.threadData.lastMessage.text}
                        </Typography>
                      </Stack>
                      <Stack direction={"column"} alignItems={"flex-end"}>
                        <Typography variant="subtitle1">
                          {item.threadData.lastMessage &&
                          item.threadData.lastMessage.timestamp?.seconds
                            ? formatDistanceToNow(
                                new Date(
                                  item.threadData.lastMessage.timestamp
                                    ?.seconds * 1000
                                )
                              ) + " ago"
                            : ""}
                        </Typography>
                        <Avatar
                          sx={{
                            width: "20px",
                            height: "20px",
                            bgcolor: "red",
                            color: "white",
                            fontSize: "10px",
                          }}
                        >
                          {item.threadData.unreadCount[
                            userSlice.user?._id?.toString() ?? ""
                          ] || 0}
                        </Avatar>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ChatsPage;
