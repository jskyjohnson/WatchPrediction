import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";

import styles from "../styles/Home.module.css";

const API_ENDPOINT = "http://localhost:8000/";

const API_CLIENT = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
});

const Home = () => {
  const [imageSrc, setImageSrc] = useState("");

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
    // var data = new FormData();
    // data.append("image", targetFile);
    // API_CLIENT.post("/classify", data, {
    //   headers: { "Content-Type": targetFile.type },
    // })
    //   .then((response) => {
    //     // this.setState({ predictions: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className={styles.App}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p> hello what the hewck is going on???</p>
        <div
          className={styles.dropzone}
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
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
