import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useCallback, useRef } from "react";
import Slider from "react-slick";

const BannerCarousel = () => {
    const sliderRef = useRef<any>(null);
    const autoplaySpeedRef = useRef<number>(4000);

    const banners = [
        { src: "/banners/banner1.jpg", alt: "Banner 1" },
        { src: "/banners/banner2.jpg", alt: "Banner 2" },
        { src: "/banners/banner3.jpg", alt: "Banner 3" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: autoplaySpeedRef.current,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const handleChangeSlide = useCallback((direction: number) => {
        direction == 1 ? sliderRef.current?.slickNext() : sliderRef.current?.slickPrev();
      }, []);
      

    return (
        <Box sx={{ width: "100%", maxWidth: "100%", overflow: "hidden", borderRadius: 4, marginTop: 5 }}>
            <Slider ref={sliderRef} {...settings}>
                {banners.map((banner, index) => (
                    <Box key={index} component="div">
                        <img
                            src={banner.src}
                            alt={banner.alt}
                            style={{
                                width: "100%",
                                height: "500px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    </Box>
                ))}
            </Slider>

            <IconButton
                onClick={() => handleChangeSlide(0)}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 10,
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                onClick={() => handleChangeSlide(1)}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
};

export default BannerCarousel;
