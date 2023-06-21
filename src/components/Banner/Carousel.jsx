import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { useState } from "react";
import { useEffect, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import { numberWithComma } from "../../utils/numberWithComma";
import "react-alice-carousel/lib/alice-carousel.css"
import { TrendingCoins } from '../../config/api'




const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const slider = useRef(null);
  const useStyles = makeStyles(theme => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      color: "white",
      textDecoration: "none",
      textTransform: "uppercase",
    },
  }));
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(
      TrendingCoins(currency)
      // `/coingecko/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      //"http://localhost:4200/coins"
    );

    setTrending(data);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  const items = trending.map(coin => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link key={coin.id} className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
          
        />
        <span>
          {coin?.symbol}&nbsp;
          <span style={{
            color: profit > 0 ? 'green' : 'red',
            fontWeight: 500
          }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}
          {numberWithComma(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
    1024:{
      items:5,
    },
    1440:{
      items:6,
    }
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking={true}
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        mouseDragEnabled={true}
        autoPlay
        ref={slider}
      />
    </div>
  );
};

export default Carousel;
