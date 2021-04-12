import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import CheckWeb3 from "../Blockchain/Web3Utils";

function Home() {
  return (
    <React.Fragment>
      <CssBaseline />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width: "85vw",
          // marginTop: "50px",
        }}
      >
        <h1>Hammer Down!</h1>
        <img
          src={process.env.PUBLIC_URL + "rein.jpg"}
          alt="rein"
          height="200"
        />

        <button onClick={() => CheckWeb3()}>meta</button>
      </div>
    </React.Fragment>
  );
}

export default Home;
