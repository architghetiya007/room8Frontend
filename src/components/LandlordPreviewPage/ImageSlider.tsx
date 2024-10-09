import React from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // Import Material Icons for navigation arrows

const ImageSlider: React.FC<{
  images: string[];
  height?: string;
  width?: string;
}> = ({ images, height = "400px", width = "100%" }) => {
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
          width: "40px", // Set width of the button
          height: "40px", // Set height of the button
          borderRadius: "50%", // Make it circular
          backgroundColor: "white", // Background color
          boxShadow: 2, // Shadow for elevation
        }}
      >
        <IconButton sx={{ padding: 0 ,marginRight: '20px'}}>
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
          width: "40px", // Set width of the button
          height: "40px", // Set height of the button
          borderRadius: "50%", // Make it circular
          backgroundColor: "white", // Background color
          boxShadow: 2, // Shadow for elevation
        }}
      >
        <IconButton sx={{ padding: 0,marginLeft: '-10px' }}>
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

  return (
    <Box sx={{ width: width, margin: "auto", position: "relative" }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Slide ${index + 1}`}
            sx={{
              width: "100%", // Use full width of the slide
              height: height, // Set the height here
              borderRadius: "8px",
              objectFit: "cover", // Maintain aspect ratio while filling the height
            }}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ImageSlider;
