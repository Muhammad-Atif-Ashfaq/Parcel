import React, {useState, useEffect} from "react";
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import ServiceCard from "./Partials/ServiceCard"; // Import your ServiceCard component
import { web } from "@/Pages/Web/Styles/Styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "@inertiajs/react";
import OrderStepper from "@/Pages/Web/OrderStepper/OrderStepper";
import "./styles.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Arrow from "./Partials/component/Arrow.json";
import Lottie from "react-lottie";
import { useSpring, animated,config  } from "react-spring";
const services = [
    {
        heading: "Collection Point to Collection Point",
        subtitle: "Service 1",
        image: "img/ctc.png",
        serviceName: "Punct de Colectare la Punct de Colectare",
        price:'£1.50/kg',
        paragraph:
            "Alegeti din mai mult de 50 puncte de colectare: Dumneavoastră duceți coletul la punctul de colectare cel mai apropiat, indicat de sistem. Persoana căreia i-l trimiteți îl va ridica din punctul de colectare cel mai apropiat de ea, în țara sa, totul autogenerat de sistema noastra!",
    },
    {
        heading: "Collection Point to Collection Point",
        subtitle: "Service 1",
        image: "img/dtc.png",
        serviceName: "Ușa către punctul de colectare Preluare/Livrare din/către Anglia ",
        price:'£1.50/kg + £9 pentru livrare',
        paragraph:
            "Un șofer vine la dvs. acasă și ia coletul. Persoana căreia i-l trimiteți îl va ridica de la punctul de colectare cel mai apropiat de ea, alegând din peste 50 de puncte de colectare din UK și MD.",
    },
    {
        heading: "Collection Point to Collection Point",
        subtitle: "Service 1",
        image: "img/ctd.png",
        serviceName: "Punct de colectare la uşă Preluare/Livrare din/către Moldova",
        price:'£1.50/kg + £7.50 pentru livrare',
        paragraph:
            'Duceți coletul la punctul de colectare cel mai apropiat de dvs, apoi, un șofer îl va livra direct la casa persoanei căreia i-l trimiteți, în țara sa."',
    },
    {
        heading: "Collection Point to Collection Point",
        subtitle: "Service 1",
        image: "img/dtd.png",
        serviceName: "Din ușă în ușă",
        price:'£1.50/kg + £15 pentru livrare',
        paragraph:
            "Un șofer vine la dvs. acasă și ia coletul, apoi îl livrează direct la casa persoanei căreia i-l trimiteți, în țara sa.",
    },
];
const servicesSection = {
    container: {
        textAlign: "center",
        padding: "2rem",
    },
    background: {
        backgroundColor: web.bgGrayDark,
    },
    h4: {
        color: web.textBlue,
    },
};

function ServicesSection({ servicesSectionRef }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Arrow,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const theme = useTheme();
    const [openStepperModal, setOpenStepperModal] = React.useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const texts = ['expedia', 'primi', 'urmari', ];
     useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0%)", // Text starts from the top
    from: {
      opacity: 0,
      transform: "translateY(-100%)", // Text starts above the viewport
    },
    config: config.slow,
    reset: true,
    onRest: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    },
  });
    return (
        <>
            <div ref={servicesSectionRef}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Lottie
                        style={{ marginTop: "-30px" }}
                        options={defaultOptions}
                        height={80}
                        width={60}
                    />
                </Box>
                <Box
                    sx={{
                        mt:-8,
                        height: "40vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        [theme.breakpoints.down("md")]: {
                            height: "25vh",
                        },
                        [theme.breakpoints.down("sm")]: {
                            height: "22vh",
                        },
                    }}
                >
                    <Box>
                    <Typography
            variant="h5"
        
            sx={{
              ml: 14,
              mb:3,
              [theme.breakpoints.down("md")]: {
                fontSize: "20px",
                ml: 3,
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "20px",
                ml: 8,
                mt:5,
              },
            }}
          >
           Cu noi puteți
            <animated.span
              style={{
                display: "inline",
                marginLeft:'5px',
                fontWeight: 600,
                color: web.textBlue,
                fontSize: "25px",
                ...props,
              }}
            >
              {texts[currentIndex]}
            </animated.span>
          </Typography>
                        <Box sx={{ mt: 2, display: "flex", }}>
                            <Box
                                className="btn-1"
                                sx={{
                                    background: web.bgGrayDark,
                                    borderRadius: "5px",
                                    width: "145px",
                                    height: "75px",
                                    boxShadow: "1px 1px 7px black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mr: 1,
                                    cursor: "pointer",
                                    [theme.breakpoints.down("sm")]: {
                                        width: "95px",
                                        height: "75px",
                                    },
                                    ":hover": {
                                        "& .icon": {
                                            color: "#fff", 
                                        },
                                        "& .text": {
                                            color: "#fff", 
                                        },
                                    },
                              
                                }}
                            >
                                <Link href={route("collection-points")}>
                                    <Stack>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <LocationOnIcon
                                             className="icon"
                                                sx={{
                                                    color: "#0051A8",
                                                    fontSize: "2rem",
                                                    [theme.breakpoints.down(
                                                        "sm"
                                                    )]: {
                                                        fontSize: "1.5rem",
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                        className="text"
                                            sx={{
                                                color:'#0051A8',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                [theme.breakpoints.down("sm")]:
                                                    {
                                                        fontSize: "10px",
                                                        textAlign: "center",
                                                    },
                                            }}
                                        >
                                            Punctele Noastre
                                        </Typography>
                                    </Stack>
                                </Link>
                            </Box>
                            <Box
                                // className="btn-1"
                                sx={{
                                    background: '#F9E506',
                                    '&:hover' : {
                                        background:'#0051a8'
                                    },
                                    borderRadius: "5px",
                                    width: "135px",
                                    height: "85px",
                                    boxShadow: "1px 1px 7px black",
                                    mt: -1,
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    [theme.breakpoints.down("sm")]: {
                                        width: "105px",
                                        height: "90px",
                                        mt: -1,
                                    },
                                    ":hover": {
                                        "& .icon": {
                                            color: "#fff", 
                                        },
                                        "& .text": {
                                            color: "#fff", 
                                        },
                                    },
                                }}
                            >
                                <Stack
                                    onClick={() => setOpenStepperModal(true)}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <SendIcon
                                        className="icon"
                                            sx={{
                                                color: '#0051A8',
                                                fontSize: "2rem",
                                                [theme.breakpoints.down("sm")]:
                                                    {
                                                        fontSize: "1.5rem",
                                                    },
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                    className="text"
                                        sx={{
                                            color: '#0051A8',
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                            [theme.breakpoints.down("sm")]: {
                                                fontSize: "12px",
                                            },
                                        }}
                                    >
                                        Trimite Colet
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box
                                className="btn-1"
                                sx={{
                                    background: web.bgGrayDark,
                                    borderRadius: "5px",
                                    width: "145px",
                                    height: "75px",
                                    boxShadow: "1px 1px 7px black",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    ml: 1,
                                    cursor: "pointer",

                                    [theme.breakpoints.down("sm")]: {
                                        width: "95px",
                                        height: "75px",
                                    },
                                    ":hover": {
                                        "& .icon": {
                                            color: "#fff", 
                                        },
                                        "& .text": {
                                            color: "#fff", 
                                        },
                                    },
                                }}
                            >
                                <Link href={route("track-parcel")}>
                                    <Stack>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <ZoomInIcon
                                             className="icon"
                                                sx={{
                                                    color: "#0051A8",
                                                    fontSize: "2rem",
                                                    [theme.breakpoints.down(
                                                        "md"
                                                    )]: {
                                                        fontSize: "1.5rem",
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                        className="text"
                                            sx={{
                                                color:'#0051A8',
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                [theme.breakpoints.down("sm")]:
                                                    {
                                                        fontSize: "13px",
                                                    },
                                            }}
                                        >
                                            Urmărește Colet
                                        </Typography>
                                    </Stack>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ background: "#0051A8" }}>
                    <Box
                        sx={{
                            px: 10,
                            py: 3,
                            [theme.breakpoints.down("md")]: {
                                px: 7,
                                mt: 7,
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                color: "#FDBC0E",
                                fontWeight: "bold",
                                mb: 2,
                            }}
                            variant="h4"
                        >
                            Orarul Nostru Săptămânal
                        </Typography>
                        <Typography
                            color="#FDBC0E"
                            sx={{ fontWeight: "bold" }}
                            variant="h5"
                        >
                            Anglia:
                            <img
                                src="img/uk-square.png"
                                style={{
                                    height: "15px",
                                    display: "inline",
                                    margin: "0 5px",
                                }}
                            />
                        </Typography>
                        <Typography sx={{ color: "#fff", mb: 1 }}>
                            Colectăm şi livrăm pachetele &nbsp;
                            <Typography
                                sx={{
                                    display: "inline",
                                    color: "#FDBC0E",
                                    fontWeight: "bold",
                                }}
                            >
                                vineri{" "}
                                <CalendarMonthIcon
                                    sx={{ mt: -0.5, color: "#fff" }}
                                />
                            </Typography>
                            , &nbsp;
                            <Typography
                                sx={{
                                    display: "inline",
                                    color: "#FDBC0E",
                                    fontWeight: "bold",
                                }}
                            >
                                sâmbătă{" "}
                                <CalendarMonthIcon
                                    sx={{ mt: -0.5, color: "#fff" }}
                                />{" "}
                                &nbsp;
                            </Typography>
                            şi &nbsp;
                            <Typography
                                sx={{
                                    display: "inline",
                                    color: "#FDBC0E",
                                    fontWeight: "bold",
                                }}
                            >
                                duminică{" "}
                                <CalendarMonthIcon
                                    sx={{ mt: -0.5, color: "#fff" }}
                                />
                            </Typography>
                            , în funcție de locația
                            <LocationOnIcon />
                            aleasă. Detaliile specifice vor fi oferite la
                            plasarea comenzii.
                        </Typography>
                        <Typography
                            color="#FDBC0E"
                            sx={{ fontWeight: "bold" }}
                            variant="h5"
                        >
                            Moldova:{" "}
                            <img
                                src="img/moldova-square.png"
                                style={{
                                    height: "15px",
                                    display: "inline",
                                    margin: "0 5px",
                                }}
                            />
                        </Typography>
                        <Typography sx={{ color: "#fff" }}>
                            Zilele de colectare şi livrare sunt &nbsp;
                            <Typography
                                sx={{
                                    display: "inline",
                                    color: "#FDBC0E",
                                    fontWeight: "bold",
                                }}
                            >
                                marți{" "}
                                <CalendarMonthIcon
                                    sx={{ mt: -0.5, color: "#fff" }}
                                />{" "}
                                &nbsp;
                            </Typography>
                            și&nbsp;
                            <Typography
                                sx={{
                                    display: "inline",
                                    color: "#FDBC0E",
                                    fontWeight: "bold",
                                }}
                            >
                                miercuri{" "}
                                <CalendarMonthIcon
                                    sx={{ mt: -0.5, color: "#fff" }}
                                />
                            </Typography>
                            , variind în funcție de punctul de colectare
                            selectat. Veți primi informații exacte când
                            comandați.
                        </Typography>
                    </Box>
                </Box>
                <div style={servicesSection.background}>
                    <Container sx={servicesSection.container}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            gutterBottom
                            sx={servicesSection.h4}
                        >
                            Serviciile noastre
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Alegeți din gama noastră de servicii
                        </Typography>
                        <Grid container spacing={2}>
                            {services.map((service, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <ServiceCard service={service} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                    <OrderStepper
                        onClose={() => setOpenStepperModal(false)}
                        openStepperModal={openStepperModal}
                    />
                </div>
            </div>
        </>
    );
}

export default ServicesSection;
