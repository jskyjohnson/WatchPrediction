import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Footer from "../src/Footer";

const API_ENDPOINT = "http://localhost:8000/";

const API_CLIENT = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
});

const Home = () => {
  const [imageSrc, setImageSrc] = useState("");

  const [brandPredict, setBrandPredict] = useState({ predictions: null });

  let ImagePreview;
  if (imageSrc) {
    ImagePreview = (
      <img style={{ width: "210px" }} src={imageSrc} alt="img-of-a-watch" />
    );
  }

  const _onDragOver = (e: any) => {
    e.preventDefault();
  };

  const _onDragLeave = (e: any) => {
    e.preventDefault();
  };

  const _onDrop = (e: any) => {
    e.preventDefault();
    var targetFile = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onloadend = (e) => {
      setImageSrc(reader.result as any);
    };
    var data = new FormData();
    data.append("image", targetFile);
    API_CLIENT.post("/classify", data, {
      headers: { "Content-Type": targetFile.type },
    })
      .then((response) => {
        setBrandPredict({ predictions: response.data.brandPredictions });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Typography variant="h4" component="h1">
          Watch brand predictor.
        </Typography>
        <Box mt={5}>
          <Typography>
            Drag and drop an image into the square to see my model's prediction
            on brand and price estimations. (210x210p works best)
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Box
            style={{
              height: "210px",
              width: "210px",
              border: ImagePreview ? "none" : "2px dashed black",
            }}
            onDragOver={(e) => {
              _onDragOver(e);
            }}
            onDragLeave={(e) => {
              _onDragLeave(e);
            }}
            onDrop={(e) => {
              _onDrop(e);
            }}
          >
            <Box>{ImagePreview}</Box>
          </Box>
        </Grid>
        <Grid item>
          {brandPredict.predictions ? (
            <Box>
              <Typography
                variant="h4"
                component="h3"
                style={{ marginBottom: "2vh" }}
              >
                I think it's a
              </Typography>
              {brandPredict.predictions
                .filter((item) => item[1] > 0.01)
                .map((item, i, arr) => (
                  <Typography>
                    {i === arr.length - 1 && arr.length !== 1 ? "and a" : ""}{" "}
                    {item[0]} by {(item[1] * 100).toFixed(2)}%
                    {i === arr.length - 1 ? "." : ","}
                  </Typography>
                ))}
            </Box>
          ) : (
            <Typography>
              Please drag an image into the box on the left
            </Typography>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Home;
