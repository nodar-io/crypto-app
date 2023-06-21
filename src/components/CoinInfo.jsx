import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line} from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinInfo = ({ coin }) => {
  const [historical, setHistorical] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistorical = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
   

    setHistorical(data.prices);
    console.log(historical);
  };

  useEffect(() => {
    fetchHistorical();
  }, [days,currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles(theme => ({
    container: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      marginTop: 25,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: 20,
      },
    },
  }));
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historical ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1}/>
        ) : (
          <>
            <Line
              data={{
                labels: historical.map(coin => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historical.map(coin => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "gold",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 2,
                  },
                },
              }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              {chartDays.map(day => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
