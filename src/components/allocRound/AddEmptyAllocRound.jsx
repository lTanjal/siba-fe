import CardHeader from "@mui/material/CardHeader";
import { useFormik } from "formik";
import React, { useState } from "react";
import dao from "../../ajax/dao";
import { validate } from "../../validation/ValidateAddAllocRound";
import AlertBox from "../common/AlertBox";
import ConfirmationDialog from "../common/ConfirmationDialog";

import { capitalizeFirstLetter } from "../../validation/ValidationUtilities";
import { CommonContentContainer } from "../common/CommonContainers";
import AddAllocRoundForm from "./AddAllocRoundForm";

import { AppContext } from "../../AppContext";

export const AddEmptyAllocRound = ({ allAllocRoundsList }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "Error",
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "Confirm",
    content: "",
  });
  const [initialAllocRound, setInitialAllocRound] = useState({
    name: "",
    description: "",
  });
  const appContext = React.useContext(AppContext);

  // Here is a list of lessons
  // When you choose a lesson, the information goes to the form's initialvalues
  const handleChange = (e) => {
    const selected = e.target.value;
    setInitialAllocRound({
      // This is so that the entered name does not change
      // even if you select the data of an existing lesson
      name: formik.values.name,
      description: selected.description,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialAllocRound,
    validate,
    onSubmit: (values) => {
      setDialogOptions({
        title: `Are you sure you want to add ${values.name}?`,
        content: `By clicking continue, ${values.name} will be added to the allocation round list`,
        onConfirm: () => addAllocRound(values),
      });
      setDialogOpen(true);
    },
  });

  const resetForm = () => {
    setInitialAllocRound({
      name: "",
      description: "",
    });
  };

  const addAllocRound = async (submitValues) => {
    const capitalName = capitalizeFirstLetter(submitValues.name);
    const newAllocRound = {
      name: capitalName,
      description: submitValues.description,
      userId: appContext.userId,
    };

    const result = await dao.postNewAllocRound(newAllocRound);
    if (!result) {
      setAlertOptions({
        severity: "error",
        title: "Error",
        message: "Something went wrong - please try again later.",
      });
      setAlertOpen(true);
      return;
    }
    setAlertOptions({
      severity: "success",
      title: "Success!",
      message: `${submitValues.name} added successfully.`,
    });
    setAlertOpen(true);
    resetForm();
    // getAllAllocRounds();
  };
  return (
    <>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={addAllocRound}
        submitValues={formik.values}
      />
      <CommonContentContainer>
        <CardHeader title="Add a new empty allocation round ..." />
        <AddAllocRoundForm
          handleChange={handleChange}
          formik={formik}
          submitValues={formik.values}
          setInitialAllocRound={setInitialAllocRound}
          allAllocRoundsList={allAllocRoundsList}
        />
      </CommonContentContainer>
    </>
  );
};
