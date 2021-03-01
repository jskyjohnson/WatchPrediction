import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@material-ui/core";

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
    ImagePreview = <img src={imageSrc} alt="img-of-a-watch" />;
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="md">
          <Box my={10}>
            <Typography variant="h4" component="h1">
              Watch brand predictor.
            </Typography>
            <Box mt={5}>
              <Typography>
                Drag and drop an image into the square to see my model's
                prediction on model and price estimations. (210x210p works best)
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid container item>
              <div
                style={{
                  height: "210px",
                  width: "210px",
                  border: "2px dashed black",
                }} //height: 210px; width: 210px; background-color: mistyrose; border: 2px dashed gray;
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
                {ImagePreview}
              </div>
            </Grid>
            <Grid container item>
              {brandPredict.predictions ? (
                <Box>
                  <Typography>TESTING</Typography>
                </Box>
              ) : (
                <Typography>
                  {" "}
                  Please drag an image into the box on the left
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
