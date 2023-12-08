import { useRoleLoggedIn } from "../../hooks/useRoleLoggedIn";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import BuildingDisplay from "./BuildingDisplay";
import DeleteBuilding from "./DeleteBuilding";
import EditBuildingContainer from "./EditBuildingContainer";

export default function SingleBuildingDialog({
  open,
  setOpen,
  singleBuilding,
  getAllBuildings,
  setSingleBuilding,
}) {
  const { roles } = useRoleLoggedIn();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} width="400px">
      <DialogTitle id="dialog-title">Building: {singleBuilding?.name}</DialogTitle>
      <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
            style={{ position: "absolute", top: "10px", right: "20px" }}
          >
            <CloseIcon />
          </IconButton>
        {roles.admin === "1" && (
          <DialogActions>
            <DeleteBuilding
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setOpen={setOpen}
            />
             <EditBuildingContainer
              singleBuilding={singleBuilding}
              getAllBuildings={getAllBuildings}
              setSingleBuilding={setSingleBuilding}
            />
          </DialogActions>
        )}
        <List>
          <ListItem>
            <BuildingDisplay
              singleBuilding={singleBuilding}
            />
          </ListItem>
        </List>
    </Dialog>
  );
}
