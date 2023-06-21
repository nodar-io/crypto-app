import { makeStyles, Typography, Container } from "@material-ui/core";

import React from "react";
import Carousel from "./Carousel";

const Banner = () => {
  const useStyles = makeStyles(theme => ({
    banner: {
      backgroundImage: "url(./1.jpeg)",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      paddingTop: 25,
      flexDirection: "Column",
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    Typo: {
      fontWeight: "bold",
      fontFamily: "Montserrat",
      marginBottom: 15,
    },
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        {/* <div className={classes.tagline}>
          <Typography variant="h2" className={classes.Typo}>
            Crypto Application
          </Typography>
        </div> */}
        <Carousel className={classes.carousel} />
      </Container>
    </div>
  );
};

export default Banner;
