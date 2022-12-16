import React, { useState } from "react";
import dao from "../../ajax/dao";
import { Button } from "@mui/material";
import ConfirmationDialog from "../common/ConfirmationDialog";
import AlertBox from "../common/AlertBox";

export default function DeleteSubEquip(props) {
  const { singleEquipBySubId, getEquipmentsBySubId } = props;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    message: "This is an error alert — check it out!",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOptions, setDialogOptions] = useState({
    title: "this is dialog",
    content: "Something here",
  });
  const [deleteSubEquip, setDeleteSubEquip] = useState({
    subjectId: 0,
    equipmentId: 0,
  });
  let id1 = singleEquipBySubId.subjectId;
  let id2 = singleEquipBySubId.equipmentId;
  let equipmentName = singleEquipBySubId.name;

  const deleteSubjectEquipment = async (subjectId, equipmentId) => {
    subjectId = id1;
    equipmentId = id2;
    let result = await dao.deleteSingleSubjectEquipment(subjectId, equipmentId);
    if (result === 400) {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message: "Jokin meni pieleen - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    if (result === "error") {
      setAlertOptions({
        severity: "error",
        title: "Virhe",
        message:
          "Jokin meni pieleen, opetuksen poisto epäonnistui - yritä hetken kuluttua uudestaan.",
      });
      setAlertOpen(true);
      return;
    }

    setAlertOptions({
      severity: "success",
      title: "Onnistui!",
      message: `${equipmentName} poistettu.`,
    });
    setAlertOpen(true);
    getEquipmentsBySubId(subjectId);
  };

  const submitDelete = (values) => {
    setDialogOptions({
      title: `Haluatko varmasti poistaa ${values.name}?`,
      content: `Painamalla jatka poistat ${values.name} listauksesta.`,
    });
    setDialogOpen(true);

    setDeleteSubEquip(values.subjectId, values.equipmentId);

    return;
  };

  return (
    <div>
      <AlertBox
        alertOpen={alertOpen}
        alertOptions={alertOptions}
        setAlertOpen={setAlertOpen}
      />
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        dialogOptions={dialogOptions}
        setDialogOpen={setDialogOpen}
        submit={deleteSubjectEquipment}
        submitValues={deleteSubEquip}
      />
      <Button
        variant="contained"
        color="error"
        sx={{ margin: "5px", maxWidth: "85px" }}
        onClick={() => {
          submitDelete(singleEquipBySubId);
        }}
      >
        Poista
      </Button>
    </div>
  );
}