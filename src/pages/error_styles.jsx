import { styled } from "@material-ui/core/styles";
import {  Box } from '@material-ui/core'

export const Wrap = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  margin: "0 auto",
  maxWidth: "1440px",
}));

export const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "786px",
  minWidth: "200px",
  top: "50%",
  left: "50%",
  padding: "0 2%",
  margin: "0 auto",
  transform: "translate(-50%,-50%)",
  textAlign: "center",
  [theme.breakpoints.down("mobile_550")]: {
    width: "100%",
  },
}));
export const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "400px",
  objectFit: "contain",
  [theme.breakpoints.down("tablet_600")]: {
    height: "auto",
  },
}));
