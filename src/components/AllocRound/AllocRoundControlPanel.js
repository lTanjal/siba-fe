import React from "react";
//import { useTheme } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

//import Grid2 from "@mui/material/Unstable_Grid2";
//import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";

//import resultProgramStore from "../data/ResultProgramStore";
import allocationPost from "../../data/ResultAllocationStore";
import { AppContext } from "../../AppContext";

const AllocRoundControlPanel = () => {
  const [isClicked, setIsClicked] = useState(false);
  const appContext = useContext(AppContext);
  //console.log("appContext 123: "+appContext);
  //const theme = useTheme();

  return (
    <Typography color="white">
      Current allocRoundId is: {appContext.allocRoundId} &nbsp;
      <Button
        type="submit"
        variant="contained"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.startAlloc(appContext.allocRoundId);
          if (!isClicked) setIsClicked(true);
        }}
        disabled={isClicked}
      >
        Start Allocation
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="red"
        style={{ color: "white" }}
        onClick={() => {
          allocationPost.resetAlloc(appContext.allocRoundId);
          if (isClicked) setIsClicked(false);
        }}
      >
        Reset Allocation
      </Button>
      <Link to={`/alloc-fail/${appContext.allocRoundId}`}>
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          style={{ color: "#F6E9E9" }}
        >
          Show failed allocation
        </Button>
      </Link>
    </Typography>
  );
};

export default AllocRoundControlPanel;
