import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

function Home() {
  return (
    <React.Fragment>
      <CssBaseline />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25vh",
          width: "60vw",
          marginTop: "50px",
        }}
      >
        <h1>Hammer Down!</h1>
        <img
          src={process.env.PUBLIC_URL + "rein.jpg"}
          alt="rein"
          height="200"
        />
      </div>
    </React.Fragment>
  );
}

export default Home;
