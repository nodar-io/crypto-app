import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { numberWithComma } from "../../utils/numberWithComma";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../../config/api";

const tableArr = [
  "Монета",
  "Цена",
  "Изменение за 24ч",
  "Объем торгов за 24 часа",
  "Рыночная кап-ция",
];

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  //const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const res = await axios.get(CoinList(currency));

    setCoins(res.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
      // coins.length < totalCount
    ) {
      setPage(prev => prev + 1);
      
    }
  };

  const handleSearch = () => {
    return coins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 45, fontFamily: "Montserrat" }}
        >
          Курсы криптовалют, ранжированных по рыночной капитализации
        </Typography>
        <TextField
          label="Поиск криптовалюты..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={e => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "gold" }}>
                <TableRow>
                  {tableArr.map(cell => (
                    <TableCell
                      key={cell}
                      style={{
                        color: "black",
                        fontWeight: 800,
                      }}
                      align={cell === "Монета" ? "left" : "right"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice(0, (page - 1) * 10 + 10)
                  .map(coin => {
                    const profit = coin.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${coin.id}`)}
                        key={coin.id}
                        className={classes.row}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={coin?.image}
                            alt={coin.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {coin.symbol}
                            </span>
                            <span
                              style={{
                                color: "#d9d0d0",
                              }}
                            >
                              {coin.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {numberWithComma(coin.current_price.toFixed(2))}
                          {symbol}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {numberWithComma(coin.total_volume)}
                          {symbol}
                        </TableCell>
                        <TableCell align="right">
                          {numberWithComma(coin.market_cap)}
                          {symbol}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
