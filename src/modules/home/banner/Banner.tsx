import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Button, Grid2, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useRef } from "react";
import Slider from "react-slick";

const BannerCarousel = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery('(min-width:1460px)');
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));    const sliderRef = useRef<any>(null);
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
        <Grid2 container alignItems={'flex-start'} sx={{ marginTop: 5 }}>
            <Grid2 size={isSmallScreen ? 12 : 7} sx={{ overflow: "hidden", borderRadius: 4 }}>
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
                        top: "65%",
                        left: 10,
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "white",
                        border: 1,
                        "&:hover": {
                            color: "black",
                            cursor: "pointer",
                        },
                    }}
                >
                    <ArrowBackIos />
                </IconButton>

                <IconButton
                    onClick={() => handleChangeSlide(1)}
                    sx={{
                        position: "absolute",
                        top: "65%",
                        right: isSmallScreen ? "0%" : "41.5%",
                        transform: "translateY(-50%)",
                        zIndex: 1,
                        color: "white",
                        border: 1,
                        "&:hover": {
                            color: "black",
                            cursor: "pointer",
                        },
                    }}
                >
                    <ArrowForwardIos />
                </IconButton>
            </Grid2>
            <Grid2 size={isSmallScreen ? 12 : 4} style={{ marginLeft: isSmallScreen ? 0 : 50, marginTop: isSmallScreen ? 10 : 0 }}>
                <Box style={{ border: '1px solid black', padding: "40px 30px", borderRadius: 6, background: "linear-gradient(134deg,rgba(171, 200, 212, 1) 0%, rgba(191, 190, 189, 1) 100%)", color: "#01416e" }}>
                    <Typography variant="h3" sx={{ marginBottom: 8 }}>
                        Juntos somos mais fortes!<br />
                        {isLargeScreen
                            ? "Faça parte e conheça seus benefícios"
                            : "Conheça seus benefícios"}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Associe-se
                    </Button>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default BannerCarousel;
