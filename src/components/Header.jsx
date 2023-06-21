import {
  AppBar,
  Container,
  makeStyles,
  Toolbar,
  Typography,
  createTheme,
  ThemeProvider,
  Select,
  MenuItem,
} from "@material-ui/core";

import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles({
  title: {
    flex: 1,
    cursor: "pointer",
    fontWeight: "bold",
    fontFamily: "Montserrat",
    color: "gold",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto App
            </Typography>
            <Select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
                
              }}
            >
              <MenuItem value={"usd"}>USD</MenuItem>
              <MenuItem value={"rub"}>RUB</MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
