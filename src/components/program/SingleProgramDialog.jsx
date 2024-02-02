import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import dao from "../../ajax/dao";
import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";
import Logger from "../../logger/logger";
import DeleteProgram from "./DeleteProgram";
import EditProgram from "./EditProgram";

export default function SingleProgramDialog({
  open,
  setOpen,
  singleProgram,
  setSingleProgram,
  getAllPrograms,
}) {
  Logger.logPrefix = "SingleProgramDialog";

  const { roles } = useRoleLoggedIn();
  const { userId } = useContext(AppContext);
  const [departmentList, setDepartmentList] = useState([
    { id: 101, name: "Jazz" },
  ]);

  useEffect(() => {
    if (open && singleProgram) {
      Logger.debug(
        `Rendering SingleProgramDialog for program: ${JSON.stringify(
          singleProgram,
        )}`,
      );
    }
  }, [open, singleProgram]);

  const getDepartmentIdForDialog = async () => {
    if (roles.planner === "1") {
      Logger.debug("Fetching planner-specific Departments from server.");
      const response = await dao.fetchDepartmentplannerByUserId(userId);
      if (response.success) {
        setDepartmentList(response.data);
      } else {
        Logger.error("Error fetching planner Departments.");
      }
    }
  };

  useEffect(() => {
    getDepartmentIdForDialog();
  }, []);

  const isPlannerOfDepartment =
    roles.planner === "1" &&
    departmentList.some((dept) => dept.id === singleProgram?.departmentId);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        getAllPrograms();
      }}
    >
      <DialogTitle id="dialog-title">{`Program: ${singleProgram?.name}`}</DialogTitle>
      <IconButton
        edge="end"
        color="inherit"
        onClick={() => setOpen(false)}
        aria-label="close"
        style={{ position: "absolute", top: "10px", right: "20px" }}
      >
        <CloseIcon />
      </IconButton>
      {(roles.admin === "1" || isPlannerOfDepartment) && (
        <DialogActions>
          <DeleteProgram
            singleProgram={singleProgram}
            getAllPrograms={getAllPrograms}
            setOpen={setOpen}
          />
          <EditProgram
            singleProgram={singleProgram}
            setSingleProgram={setSingleProgram}
            getAllPrograms={getAllPrograms}
            open={open}
            setOpen={setOpen}
          />
        </DialogActions>
      )}
      <DialogContent>
        <Grid container variant="sibaGridSingleItemDisplay" column={14}>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">id:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.id}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">Name:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.name}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                Department id:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.departmentId}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogContent variant="sibaDialogContent2">
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                Department Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="singleDialogSubtitle">
                {singleProgram?.departmentName}
              </Typography>
            </Grid>
          </DialogContent>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
