import useTheme from "@mui/material/styles/useTheme";

import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

export default function AlertBox({ alertOpen, alertOptions, setAlertOpen }) {
  const theme = useTheme();

  return (
    <div>
      <Snackbar
        open={alertOpen}
        snackopen={alertOpen !== "false" && alertOpen ? "true" : "false"}
        autoHideDuration={4000}
        onClose={setAlertOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={alertOptions.severity}
          sx={{
            background: theme.palette.snackbarBackground.default,
            "& .MuiAlert-icon": {
              fontSize: "50px",
            },
            "& .MuiAlert-message": {
              alignSelf: "center",
              width: "350px",
            },
          }}
          elevation={24}
          action={
            <IconButton
              sx={{ alignSelf: "center" }}
              aria-label="sulje"
              color="inherit"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon sx={{ fontSize: "30px" }} />
            </IconButton>
          }
        >
          <AlertTitle>{alertOptions.title}</AlertTitle>
          {alertOptions.message}
        </Alert>
      </Snackbar>
    </div>
  );
}