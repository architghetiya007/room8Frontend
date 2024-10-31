import {
  Avatar,
  Box,
  Card,
  CardContent,
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
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";

const ChatsPage: React.FC = () => {
  const { chatId } = useParams();
  const userSlice = useSelector((state: RootState) => state.user);
  const [chatUsers, setChatUsers] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  if (!userSlice.user) {
    return <Navigate to="/" replace />;
  }
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
    <Container>
      <Card
        sx={{
          width: "100%", // Full width for smaller screens
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <CardContent
          sx={{
            px: {
              xs: 1,
              md: 2,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
            }}
            mb={2}
          >
            Chats
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} px={2} py={0}>
                  <OutlinedInput
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    fullWidth
                    size="small"
                    placeholder="Search By Name"
                    endAdornment={
                      <Box
                        sx={{
                          backgroundColor: "black",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          borderTopRightRadius: "8px",
                          borderBottomRightRadius: "8px",
                          width: "50px",
                          justifyContent: "center",
                          marginRight: "-15px",
                        }}
                      >
                        <Search sx={{ color: "white" }} />
                      </Box>
                    }
                  />
                </Grid>
                {filterChats.map((item) => {
                  return (
                    <Grid key={item} item xs={12} px={2} py={1}>
                      <Stack
                        onClick={() => navigate(`${item.threadId}/${item.id}`)}
                        direction={"row"}
                        alignItems={"center"}
                        spacing={3}
                        sx={{
                          backgroundColor:
                            chatId === item.threadId ? "#F4F6FA" : "none",
                          borderRadius: "12px",
                          px: 2,
                          py: 2,
                          borderLeft:
                            chatId === item.threadId
                              ? "4px solid #FF445E"
                              : "none",
                        }}
                      >
                        {item.profilePic ? (
                          <Avatar src={item.profilePic}></Avatar>
                        ) : (
                          <Avatar>{item.fullName.charAt(0)}</Avatar>
                        )}

                        <Stack direction={"column"} flex={1}>
                          <Typography
                            variant="h6"
                            sx={{ color: "#3B3D44", fontWeight: "600" }}
                          >
                            {item.fullName}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#3B3D44", fontWeight: "500" }}
                          >
                            {item.threadData.lastMessage.text}
                          </Typography>
                        </Stack>
                        <Stack direction={"column"} alignItems={"flex-end"}>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: "#929BAB", fontWeight: "450" }}
                          >
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
                              mt: 1,
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
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChatsPage;
