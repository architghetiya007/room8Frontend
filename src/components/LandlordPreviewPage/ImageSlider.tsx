import React, { useRef } from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Fullscreen,
} from "@mui/icons-material"; // Import Close icon

const ImageSlider: React.FC<{
  images: string[];
  height?: string;
  width?: string;
}> = ({ images, height = "400px", width = "100%" }) => {
  const sliderRef = useRef<Slider>(null); // Reference to the Slider
  // Custom arrow components
  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={className}
        onClick={onClick}
        sx={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        <IconButton sx={{ padding: 0, mr: "16px" }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <Box
        className={className}
        onClick={onClick}
        sx={{
          ...style,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        <IconButton sx={{ padding: 0, ml: "-10px" }}>
          <ArrowBackIos />
        </IconButton>
      </Box>
    );
  };
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop through images
    speed: 500, // Transition speed
    slidesToShow: 3, // Show three slides at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Automatically play
    autoplaySpeed: 3000, // Delay between autoplay slides
    nextArrow: <SampleNextArrow />, // Custom next arrow
    prevArrow: <SamplePrevArrow />, // Custom previous arrow
    responsive: [
      // Responsive settings for different screen sizes
      {
        breakpoint: 1024, // Breakpoint for tablet
        settings: {
          slidesToShow: 2, // Show two slides on tablet
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600, // Breakpoint for mobile
        settings: {
          slidesToShow: 1, // Show one slide on mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Function to handle full-screen toggle
  const toggleFullScreen = (image: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.style.width = "100%"; // Full width
    imgElement.style.height = "100%"; // Full height
    imgElement.style.objectFit = "contain"; // Maintain aspect ratio

    const fullScreenContainer = document.createElement("div");
    fullScreenContainer.style.position = "fixed";
    fullScreenContainer.style.top = "0px";
    fullScreenContainer.style.left = "0px";
    fullScreenContainer.style.width = "100vw";
    fullScreenContainer.style.height = "100vh";
    fullScreenContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    fullScreenContainer.style.display = "flex";
    fullScreenContainer.style.alignItems = "center";
    fullScreenContainer.style.justifyContent = "center";
    fullScreenContainer.style.zIndex = "9999"; // Ensure it's above everything else
    fullScreenContainer.appendChild(imgElement);

    // Create and append close button
    const closeButton = document.createElement("div");
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "white";
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    closeButton.onclick = () => {
      document.body.removeChild(fullScreenContainer);
    };

    fullScreenContainer.appendChild(closeButton);
    document.body.appendChild(fullScreenContainer);
  };

  return (
    <Box sx={{ width: width, margin: "auto", position: "relative" }}>
      <Slider {...settings} ref={sliderRef}>
        {images.map((image, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: height,
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <IconButton
              onClick={() => toggleFullScreen(image)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: 2,
              }}
            >
              <Fullscreen />
            </IconButton>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
