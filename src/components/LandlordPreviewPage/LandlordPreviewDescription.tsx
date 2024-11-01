import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography, Stack, OutlinedInput } from "@mui/material";
import CustomLoadingButton from "../comman/CustomLoadingButton";
import OutlinedButton from "../comman/OutlinedButton";
import GoogleMaps from "../GoogleMaps";
import { AdvertisementData } from "../../types/advertisement";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import BALCONY_PROPERTY from "../../assets/hunter/BALCONY_PROPERTY.png";
import BATHROOM from "../../assets/hunter/BATHROOM.png";
import FURNISHED from "../../assets/hunter/FURNISHED.png";
import KITCHEN from "../../assets/hunter/KITCHEN.png";
import LIFT from "../../assets/hunter/LIFT.png";
import MAXIMUM_FLATMATES from "../../assets/hunter/MAXIMUM_FLATMATES.png";
import MINIMUM_PROPERY_SIZE from "../../assets/hunter/MINIMUM_PROPERY_SIZE.png";
import NUMBER_OF_ROOMS from "../../assets/hunter/NUMBER_OF_ROOMS.png";
import PARKING from "../../assets/hunter/PARKING.png";
import useCommonTranslation from "../../hooks/useCommonTranslation";
import ProfilePNG from "../../assets/images/profile.png";
import ANIMAL from "../../assets/hunter/ANIMAL.png";
import SMOKER from "../../assets/hunter/SMOKER.png";
import WITH_CHILDREN from "../../assets/hunter/WITH_CHILDREN.png";
import HYBRID_WORK from "../../assets/hunter/HYBRID_WORK.png";
import FLOORIMG from "../../assets/landlord/floor.png";
import BEDIMG from "../../assets/landlord/bed.png";
import HOMEIMG from "../../assets/landlord/home.png";
import WOMAN_MAN from "../../assets/hunter/WOMAN_MAN.png";
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import PreviewTypography from "../comman/PreviewTypography";
interface LandlordPreviewDescriptionProps {
  updateStatusAPI: () => void;
  loading: boolean;
  previewData: AdvertisementData;
}
const LandlordPreviewDescription: React.FC<LandlordPreviewDescriptionProps> = ({
  previewData,
  loading,
  updateStatusAPI,
}) => {
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { t } = useCommonTranslation();
  const userSlice = useSelector((state: RootState) => state.user);
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
        <Grid item xs={12}>
          <Typography
            sx={{
              background:
                "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "45px",
              fontWeight: "700",
            }}
          >
            I'm looking for a flatmate to my apartment
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ fontWeight: "700", color: "#3B3D44", fontSize: "26px" }}
          >
            Few words about myself:
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{ fontWeight: "450", fontSize: "22px", color: "#5E646F" }}
            >
              {previewData.landlordData?.descriptionAbout}
            </Typography>
            <Typography
              sx={{ fontWeight: "700", fontSize: "28px", color: "#3B3D44" }}
            >
              My Ideal Flatmate
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ width: "25px", height: "25px" }}
                component={"img"}
                src={MINIMUM_PROPERY_SIZE}
              ></Box>
              <PreviewTypography
                title={"Age : "}
                desc={
                  previewData.landlordData?.ageOfCurrentTenants?.toString() ??
                  ""
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ width: "25px", height: "25px" }}
                component={"img"}
                src={WOMAN_MAN}
              ></Box>
              <PreviewTypography
                title={previewData.landlordData?.genderOfCurrentTenants?.toString() ??
                  ""}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ width: "25px", height: "25px" }}
                component={"img"}
                src={SMOKER}
              ></Box>
              <PreviewTypography
                title={previewData.landlordData?.tenantsSmoking?.toString() ??
                  ""}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ width: "25px", height: "25px" }}
                component={"img"}
                src={ANIMAL}
              ></Box>
              <PreviewTypography
                title={previewData.landlordData?.acceptPets?.toString() === "YES" ?
                  "I accept living with animals" : "Animals not allowed"}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{ width: "25px", height: "25px" }}
                component={"img"}
                src={WITH_CHILDREN}
              ></Box>
              <PreviewTypography
                title={previewData.landlordData?.acceptTenantWithChildren?.toString() === "YES" ?
                  "I accept tenants with children" : "Tenants with children not allowed"}
              />
            </Box>
          </Box>
        </Grid>

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
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                sx={{
                  width: "150px",
                  height: "130px",
                }}
                component={"img"}
                src={previewData.landlordData?.flatmatePhoto ?? ProfilePNG}
              ></Box>
              <Box sx={{ ml: 1 }}>
                <Typography
                  sx={{
                    fontSize: "26px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {previewData.landlordData?.currentTenantsName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#3B3D44" }}
                >
                  {previewData.landlordData?.age} years old <br />
                  {previewData.landlordData?.name}
                </Typography>
              </Box>
            </Stack>
            <Stack>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={HYBRID_WORK}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#3B3D44",
                      }}
                    >
                      I{" "}
                      {t(
                        `typeofEmployment.${previewData.landlordData?.typeOfEmployment}`
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={SMOKER}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#3B3D44",
                      }}
                    >
                      I{" "}
                      {previewData.landlordData?.tenantsSmoking
                        ? "smoke"
                        : "don't smoke"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={ANIMAL}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#3B3D44",
                      }}
                    >
                      I{" "}
                      {previewData.hunterData?.havePet
                        ? "have Animal"
                        : "don't have Animal"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={WITH_CHILDREN}
                    ></Box>
                    <Typography
                      sx={{
                        border: "1px solid #FBE0EA",
                        borderRadius: 2,
                        p: 1,
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#3B3D44",
                      }}
                    >
                      I{" "}
                      {previewData.landlordData?.haveAnyChildren
                        ? "have Children"
                        : "don't have Children"}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
            {userSlice.user &&
              previewData.userId &&
              userSlice.user?._id !== previewData.userId && (
                <>
                  <Typography sx={{fontSize: '20px',fontWeight: '600',color: "#3B3D44"}} variant="h4">Write a Message</Typography>
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
                </>
              )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{
              borderRadius: 5,
              display: "flex",
              boxShadow: 3, // Predefined MUI box shadow (3 is moderate depth)
              width: "100%",
              p: 3,
              mt: 4,
              mb: 4,
            }}
            spacing={2}
          >
            <Typography
              sx={{
                fontSize: "45px",
                fontWeight: "700",
                background:
                  "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              A few words about the apartment
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "450", fontSize: "22px", color: "#5E646F" }}
            >
              {previewData.landlordData?.descriptionOfFlat}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "45px",
                      fontWeight: "700",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Property Features
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
                      title={"Property size : "}
                      desc={previewData.landlordData?.propertySize + " (m²)"}
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
                      title={"Furnished : "}
                      desc={previewData.landlordData?.isRoomFurnished}
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
                      title={"Parking : "}
                      desc={t(`parking.${previewData.landlordData?.parking}`)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      component={"img"}
                      sx={{ width: "25px", height: "25px" }}
                      src={FLOORIMG}
                    ></Box>
                    <PreviewTypography
                      title={"Floor : "}
                      desc={
                        previewData.landlordData?.floor +
                        "/" +
                        previewData.landlordData?.numberOfFloor
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={LIFT}
                    ></Box>
                    <PreviewTypography
                      title={"Lift in the building : "}
                      desc={previewData.landlordData?.liftInBuilding}
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
                      title={"Kitchen : "}
                      desc={t(
                        `landlord.kitchen.${previewData.landlordData?.kitchen}`
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
                      title={"Balcony in the property : "}
                      desc={previewData.landlordData?.balconyInApartment}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={WITH_CHILDREN}
                    ></Box>
                    <PreviewTypography
                      title={"Kids in the apartment : "}
                      desc={previewData.landlordData?.doChildrenLiveHere}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={HOMEIMG}
                    ></Box>
                    <PreviewTypography
                      title={"Owner lives here : "}
                      desc={previewData.landlordData?.ownerLiveHere}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "45px",
                      fontWeight: "700",
                      background:
                        "linear-gradient(to right, #4AB1F1 0%, #566CEC 33%, #D749AF 66%, #FF7C51 100%)",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Room Features
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={NUMBER_OF_ROOMS}
                    ></Box>
                    <PreviewTypography
                      title={"room : "}
                      desc={previewData.landlordData?.roomSize + " (m²)"}
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
                      title={"Max people in the room : "}
                      desc={previewData.landlordData?.howManyPeopleInRoom}
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
                      title={"Furnished : "}
                      desc={previewData.landlordData?.isRoomFurnished}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{ width: "25px", height: "25px" }}
                      component={"img"}
                      src={BEDIMG}
                    ></Box>
                    <PreviewTypography
                      title={"Bed : "}
                      desc={previewData.landlordData?.bed}
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
                        previewData.landlordData?.privateBathroom
                          ? "Private Bathroom"
                          : "Shared Bathroom"
                      }
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
                      title={"Balcony in the room : "}
                      desc={previewData.landlordData?.balconyInApartment}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <GoogleMaps
                {...(previewData.landlordData?.address?.coordinate && {
                  lat: previewData.landlordData.address.coordinate[1],
                  lng: previewData.landlordData.address.coordinate[0],
                })}
              />
            </Grid>
          </Grid>
        </Grid>
        {userSlice.user &&
          previewData.userId &&
          userSlice.user?._id !== previewData.userId && (
            <Grid item xs={12}>
              <Stack
                sx={{
                  borderRadius: 5,
                  display: "flex",
                  width: "100%",
                  p: 1,
                }}
                spacing={2}
              >
                <Typography sx={{fontSize: '20px',fontWeight: '600',color: "#3B3D44"}} variant="h4">Write a Message</Typography>
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

export default LandlordPreviewDescription;
