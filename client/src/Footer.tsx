import React from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { Box } from "@material-ui/core";

export default function Footer() {
  return (
    <Box
      style={{
        marginTop: "calc(10% + 60px)",
        bottom: "0",
        position: "absolute",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        paddingBottom: "5px",
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center">
        {"See some of my other projects "}
        <MuiLink color="inherit" href="https://www.skyjohnson.me/">
          On my skyjohnson.me
        </MuiLink>{" "}
      </Typography>
    </Box>
  );
}
