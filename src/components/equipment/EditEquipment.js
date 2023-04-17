import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { DialogContent, DialogContentText } from "@mui/material";
import dao from "../../ajax/dao";
import ValidateEditEquipment from "../../validation/ValidateEditEquipment";

export default function EditEquipment(props) {
  const {
    singleEquipment,
    /* setSingleEquipment, */
    getAllEquipments,
    /* open, */
    setOpen,
  } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [equipment, setEquipment] = useState({
    id: singleEquipment?.id,
    name: singleEquipment?.name,
    priority: singleEquipment?.equipmentPriority,
    description: singleEquipment?.description,
  });

  const submitEdits = async () => {
    let validation = ValidateEditEquipment(equipment);
    if (Object.values(validation).length !== 0) {
      alert(Object.values(validation));
    } else {
      let result = await dao.editEquipment(equipment);
      if (!result) {
        alert("Something went wrong");
      } else {
        alert(`Equipment ${equipment.name} updated`);
        setEditOpen(false);
        setOpen(false);
        getAllEquipments();
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ color: "white" }}
        onClick={() => {
          setEditOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit equipment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={3} column={7} direction="column">
              <Grid item xs={12}>
                <TextField
                  name='Equipment'
                  label='Equipment'
                  defaultValue={singleEquipment?.name}
                  onChange={(e) =>
                    setEquipment({ ...equipment, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='Priority'
                  label='Priority'
                  type="number"
                  defaultValue={singleEquipment?.equipmentPriority}
                  onChange={(e) =>
                    setEquipment({ ...equipment, priority: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='Description'
                  label='Description'
                  defaultValue={singleEquipment?.description}
                  onChange={(e) =>
                    setEquipment({ ...equipment, description: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              onClick={submitEdits}
              variant="contained"
              style={{ color: "white" }}
            >
              Submit
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
