import { useState } from "react";
import dao from "../../ajax/dao";
import Logger from "../../logger/logger";
import {
  capitalizeFirstLetter,
  validate,
} from "../../validation/ValidateAddBuilding";

import Button from "@mui/material/Button";
import AlertBox from "../common/AlertBox";

export default function ImportBuildingButton({
  importBuildings,
  failedBuildings,
  setFailedBuildings,
  getAllBuildings,
}) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "This is title",
    message: "This is an error alert — check it out!",
    severity: "error",
  });

  const importData = async () => {
    let successCount = 0;
    let failedCount = 0;
    const tempFailedBuildings = [];
    const buildingsToSend = [];
    const buildingSet = new Set();

    await Promise.all(
      importBuildings.map(async (building) => {
        const newBuilding = {
          name: building.name ? capitalizeFirstLetter(building.name) : "",
          description: building.description ? building.description : "",
        };

        // check if there is duplicated name of building after capitalization
        if (buildingSet.has(newBuilding.name)) {
          building.FailedReason = "Name of building is duplicated in the file";
          tempFailedBuildings.push(building);
          failedCount++;

          return;
        } else {
          buildingSet.add(newBuilding.name);
        }

        const validateResult = await validate(newBuilding);

        if (validateResult.name) {
          building.FailedReason = validateResult.name;
          tempFailedBuildings.push(building);
          failedCount++;
        } else if (validateResult.description) {
          building.FailedReason = validateResult.description;
          tempFailedBuildings.push(building);
          failedCount++;
        } else {
          buildingsToSend.push(newBuilding);
          successCount++;
        }
      }),
    );

    setFailedBuildings([...failedBuildings, ...tempFailedBuildings]);
    Logger.debug("failed buildings", tempFailedBuildings);

    // if the data is empty after validation, not sending to backend
    if (buildingsToSend.length === 0) {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something wrong happened. ${failedCount} building failed to add.`,
      });
      setAlertOpen(true);

      return;
    }

    Logger.debug("buildingsToSend", buildingsToSend);

    const result = await dao.postNewBuildings(buildingsToSend);

    if (result) {
      getAllBuildings();

      setAlertOptions({
        severity: "success",
        title: "Success!",
        message: `${successCount} building added and ${failedCount} building failed to add.`,
      });
      setAlertOpen(true);
    } else {
      setAlertOptions({
        severity: "error",
        title: "Error!",
        message: `Something wrong happened. ${failedCount} building failed to add.`,
      });
      setAlertOpen(true);
    }
  };

  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <Button
        variant="contained"
        onClick={() => {
          importData();
        }}
      >
        Import data
      </Button>
    </>
  );
}