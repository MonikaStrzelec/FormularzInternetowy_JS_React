import React, { useEffect, useState } from "react";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topAppBar: {
    Height: "40vh",
    minHeight: "150px",
  },
  toolbar: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "50px",
    paddingBottom: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [timer, setTimer] = useState(300);

useEffect(() => {
    setInterval(timerTime, 1000);
  }, []);

  const padTime = time => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

  const format = time => {
    if(time >0 ){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${padTime(seconds)}`;
  } else{
    return "Przerwanie wypełniania formularza z powodu przekroczenia czasu oczekiwania";
  }
  };

  const timerTime = () => {
    setTimer((prev) => prev - 1);
  };

  return (
    <AppBar
      position="static"
      elevation={5}
      color="default"
      className={classes.topAppBar}
    >
      <Toolbar className={classes.toolbar}>
        <Grid alignItems="flex-end" justify="center">
        <Typography variant="h6">Pozostało ci:</Typography>
          {format(timer)}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
