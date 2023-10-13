import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useTheme from "@mui/material/styles/useTheme";
import AllocRoundInputField from "./AllocRoundInputField";

export default function AddAllocRoundForm({
  formik,
  submitValues,
  setInitialAllocRound,
}) {
  const theme = useTheme();

  const onCancel = () => {
    window.history.back(); // Return to the previous page
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container variant="sibaGridAddForm" column={8}>
          <AllocRoundInputField formik={formik} />
        </Grid>
        <Grid container item xs={12} justifyContent="space-between" padding={2}>
          <Button
            type="button"
            variant="outlined"
            style={theme.components.MuiButton.redbuttton}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={theme.components.MuiButton.greenbutton}
            onClick={() => {
              setInitialAllocRound(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
}
