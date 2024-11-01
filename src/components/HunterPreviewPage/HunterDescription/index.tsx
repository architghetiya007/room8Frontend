import { LoadingButton } from "@mui/lab";
import { Box, Grid, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import OutlinedButton from "../../comman/OutlinedButton";
import CustomLoadingButton from "../../comman/CustomLoadingButton";
import { AdvertisementData } from "../../../types/advertisement";
import ANIMAL from "../../../assets/hunter/ANIMAL.png";
import BALCONY_PROPERTY from "../../../assets/hunter/BALCONY_PROPERTY.png";
import BATHROOM from "../../../assets/hunter/BATHROOM.png";
import FURNISHED from "../../../assets/hunter/FURNISHED.png";
import HYBRID_WORK from "../../../assets/hunter/HYBRID_WORK.png";
import KITCHEN from "../../../assets/hunter/KITCHEN.png";
// import LIFT from "../../../assets/hunter/LIFT.png";
import LIVING_WITH_OWNER from "../../../assets/hunter/LIVING_WITH_OWNER.png";
import MAXIMUM_FLATMATES from "../../../assets/hunter/MAXIMUM_FLATMATES.png";
import MINIMUM_PROPERY_SIZE from "../../../assets/hunter/MINIMUM_PROPERY_SIZE.png";
import NUMBER_OF_ROOMS from "../../../assets/hunter/NUMBER_OF_ROOMS.png";
import ROOM_SIZE from "../../../assets/hunter/ROOM_SIZE.png";
import PARKING from "../../../assets/hunter/PARKING.png";
import SMOKER from "../../../assets/hunter/SMOKER.png";
import WITH_CHILDREN from "../../../assets/hunter/WITH_CHILDREN.png";
import WOMAN_MAN from "../../../assets/hunter/WOMAN_MAN.png";
import useCommonTranslation from "../../../hooks/useCommonTranslation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import PreviewTypography from "../../comman/PreviewTypography";
interface HunterDescriptionProps {
  updateStatusAPI: () => void;
  loading: boolean;
  previewData: AdvertisementData;
}
const HunterDescription: React.FC<HunterDescriptionProps> = ({
  updateStatusAPI,
  loading,
  previewData,
}) => {
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const userSlice = useSelector((state: RootState) => state.user);
  const { t } = useCommonTranslation();
  const navigate = useNavigate();

  const userId = userSlice.user?._id ?? "";
  const recipientId = previewData.userId ?? "";

  const checkChatExists = async () => {
    const chatQuery = query(
      collection(db, "userChats"),
      where("userIds", "array-contains", userId) // First check for one user ID
    );

    const chatSnapshot = await getDocs(chatQuery);

    // Check if the recipientId is also present in the same chat document
    const chatDoc = chatSnapshot.docs.find((doc) => {
      const chatData = doc.data();
      return chatData.userIds.includes(recipientId); // Check if recipientId is also in the userIds array
    });

    let chatId;
    if (chatDoc) {
      // If a matching document is found, use its ID
      chatId = chatDoc.id;
    } else {
      // If no document exists, create a new chat
      const newChatRef = await addDoc(collection(db, "userChats"), {
        userIds: [userId, recipientId], // Store both user IDs in an array
        timestamp: serverTimestamp(),
      });
      chatId = newChatRef.id; // Retrieve the new chatId
    }

    return chatId;
  };

  const sendMessage = async () => {
    setIsChatLoading(true);
    const chatId = checkChatExists();
    if (!chatId) {
      setIsChatLoading(false);
      console.error("chatId is not defined");
      return;
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
      senderId: userId,
      text: newMessage,
      timestamp: serverTimestamp(),
      readBy: [userId],
    });

    await updateDoc(chatDocRef, {
      lastMessage: {
        text: newMessage,
        senderId: userId,
        timestamp: serverTimestamp(),
      },
      [`unreadCount.${recipientId}`]: increment(1),
    });

    setNewMessage("");
    setIsChatLoading(false);
  };
  return (
    <Box
      sx={{
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
        width: "100%",
        flexWrap: {
          xs: "wrap",
          md: "nowrap",
        },
        p: 3,
      }}
    >
      <Grid container spacing={1}>
        {previewData!.hunterData!.anotherPerson!.length > 0 && (
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "46px",
                fontWeight: "700",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              I am looking for a place with my friend
            </Typography>
          </Grid>
        )}
        {previewData!.hunterData!.anotherPerson!.map((item) => {
          return (
            <Box key={item.name} pl={1}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={"bold"}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  {item.age} years old, {item.gender}
                </Typography>
              </Grid>
            </Box>
          );
        })}

        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "46px",
              fontWeight: "700",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            A few facts about me
          </Typography>
        </Grid>
        <Grid item xs={12} mt={1} mb={2}>
          <Grid container spacing={1}>
            {previewData.hunterData?.typeOfEmployment && (
              <Grid item xs={12} md={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component={"img"}
                    sx={{ width: "25px", height: "25px" }}
                    src={HYBRID_WORK}
                  ></Box>
                  <PreviewTypography
                    title={t(
                      `typeofEmployment.${previewData.hunterData?.typeOfEmployment}`
                    )}
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component={"img"}
                  sx={{ width: "25px", height: "25px" }}
                  src={WITH_CHILDREN}
                ></Box>
                <PreviewTypography
                  title={
                    previewData.hunterData?.withChild
                      ? "With Children"
                      : "No Children"
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component={"img"}
                  sx={{ width: "25px", height: "25px" }}
                  src={SMOKER}
                ></Box>
                <PreviewTypography
                  title={
                    previewData.hunterData?.areYouSmoking
                      ? "Smoker"
                      : "Not a Smoker"
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component={"img"}
                  sx={{ width: "25px", height: "25px" }}
                  src={ANIMAL}
                ></Box>
                <PreviewTypography
                  title={
                    previewData.hunterData?.acceptPet
                      ? "Animal"
                      : "Not a Animal"
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 1 }}>
            <Typography
              variant="h6"
              sx={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
            >
              {previewData.hunterData?.describeYourSelf}
            </Typography>
          </Box>
        </Grid>
        {userSlice.user &&
          previewData.userId &&
          userSlice.user?._id !== previewData.userId && (
            <Grid item xs={12} md={5}>
              <Stack
                sx={{
                  borderRadius: 5,
                  display: "flex",
                  boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
                  width: "100%",
                  p: 3,
                }}
                spacing={2}
              >
                <Typography variant="h4">Write a Message</Typography>
                <OutlinedInput
                  disabled={isChatLoading}
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                  placeholder="Your Message"
                  multiline
                  minRows={4}
                />
                <LoadingButton
                  loading={isChatLoading}
                  sx={{
                    background:
                      "linear-gradient(to right, #4AB1F1, #566CEC, #D749AF, #FF7C51)",
                    width: "100%",
                    p: 1,
                    borderRadius: "8px",
                    color: "white",
                    textTransform: "none",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    fontSize: "24px",
                  }}
                  type="button"
                  disabled={!newMessage.toString().trim()}
                  onClick={() => sendMessage()}
                >
                  Send a Message
                </LoadingButton>
              </Stack>
            </Grid>
          )}

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "46px",
                      fontWeight: "700",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Property preferences
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={MINIMUM_PROPERY_SIZE}
                    ></Box>
                    <PreviewTypography
                      title={"Minimum property size: "}
                      desc={
                        previewData.hunterData?.minimumPropertySize + " (m²)"
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <PreviewTypography
                      title={"Maximum flatmates: "}
                      desc={t(
                        `tenants.${previewData.hunterData?.maximumNumberOfpeople}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={NUMBER_OF_ROOMS}
                    ></Box>
                    <PreviewTypography
                      title={"Minimum number of rooms: "}
                      desc={
                        previewData.hunterData?.minimumRoomSize?.toString() ??
                        ""
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={FURNISHED}
                    ></Box>
                    <PreviewTypography
                      title={"Furnished: "}
                      desc={t(
                        `commanOptions.${previewData.hunterData?.furnished}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={PARKING}
                    ></Box>
                    <PreviewTypography
                      title={"Parking: "}
                      desc={t(
                        `${previewData.hunterData?.parking
                          ?.map((item) => t(`parking.${item}`))
                          .toString()}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={KITCHEN}
                    ></Box>
                    <PreviewTypography
                      title={"Kitchen: "}
                      desc={t(`kitchen.${previewData.hunterData?.kitchen}`)}
                    />
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={LIFT}
                    ></Box>
                    <PreviewTypography
                      title={"Lift: "}
                      desc={
                        previewData.hunterData?.minimumNumberOfTenants ?? ""
                      }
                    />
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BALCONY_PROPERTY}
                    ></Box>
                    <PreviewTypography
                      title={"Balcony in the property: "}
                      desc={t(
                        `commanOptions.${previewData.hunterData?.balcony}`
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "46px",
                      fontWeight: "700",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Room preferences
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={ROOM_SIZE}
                    ></Box>
                    <PreviewTypography
                      title={"Minimum room size: "}
                      desc={previewData.hunterData?.minimumRoomSize + " (m²)"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={MAXIMUM_FLATMATES}
                    ></Box>
                    <PreviewTypography
                      title={"Maximum number of tenants: "}
                      desc={t(
                        `tenants.${previewData.hunterData?.minimumNumberOfTenants}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={FURNISHED}
                    ></Box>
                    <PreviewTypography
                      title={"Furnished: "}
                      desc={t(
                        `commanOptions.${previewData.hunterData?.furnishedRoom}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BALCONY_PROPERTY}
                    ></Box>
                    <PreviewTypography
                      title={"Balcony in the room: "}
                      desc={t(
                        `commanOptions.${previewData.hunterData?.balconyInRoom}`
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BATHROOM}
                    ></Box>
                    <PreviewTypography
                      title={
                        previewData.hunterData?.privateBathroom
                          ? "Private Bathroom"
                          : "Shared Bathroom"
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2}>
          <Typography
            sx={{
              fontSize: "46px",
              fontWeight: "700",
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Flatemate preferences
          </Typography>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              sx={{ width: "25px", height: "25px" }}
              src={WOMAN_MAN}
            ></Box>
            <PreviewTypography
              title={t(
                `accommodation.${previewData!.hunterData!.accommodation}`
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              sx={{ width: "25px", height: "25px" }}
              src={LIVING_WITH_OWNER}
            ></Box>
            <PreviewTypography
              title={"Living with owner? : "}
              desc={t(
                `commanOptions.${previewData.hunterData?.livingWithOwner}`
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              sx={{ width: "25px", height: "25px" }}
              src={WITH_CHILDREN}
            ></Box>
            <PreviewTypography
              title={
                previewData.hunterData?.withChild
                  ? "With Children"
                  : "Without children"
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              sx={{ width: "25px", height: "25px" }}
              src={SMOKER}
            ></Box>
            <PreviewTypography
              title={
                previewData.hunterData?.acceptSmoking
                  ? "Smoker"
                  : "Not a smoker"
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={"img"}
              sx={{ width: "25px", height: "25px" }}
              src={ANIMAL}
            ></Box>
            <PreviewTypography
              title={
                previewData.hunterData?.acceptPet
                  ? "Pets accepted"
                  : "Pets not accepted"
              }
            />
          </Box>
        </Grid>
        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} mt={2} mb={2}>
            <Box sx={{ borderBottom: "1px solid lightgray" }}></Box>
          </Grid>
        )}

        {previewData?.userId && userSlice?.user?._id === previewData.userId && (
          <Grid item xs={12} md={6}>
            <OutlinedButton type="button" onClick={() => navigate(-1)}>
              Back
            </OutlinedButton>
          </Grid>
        )}
        {previewData?.userId &&
          userSlice?.user?._id === previewData?.userId && (
            <Grid item xs={12} md={6}>
              <CustomLoadingButton
                loading={loading}
                onClick={() => updateStatusAPI()}
                type="button"
                sx={{ width: "100%" }}
              >
                {previewData.isActive ? "Unpublish" : "Publish"}
              </CustomLoadingButton>
            </Grid>
          )}
      </Grid>
    </Box>
  );
};

export default HunterDescription;
