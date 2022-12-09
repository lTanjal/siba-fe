import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { globalTheme } from "../styles/theme";
import Radio from "@mui/material/Radio";

export default function EditSubjectEquipmentDialog(props) {
  const { formik, values, setEditSubEquip, equipmentList } = props;
  const [open, setOpen] = useState(false);
  const [ePriority, setEPriority] = useState(0);
  const handleClose = () => {
    setEditSubEquip({
      priority: null,
      obligatory: null,
      subjectId: null,
      equipmentId: null,
    });
    setOpen(false);
  };

  useEffect(() => {
    const prio = equipmentList.find((obj) => {
      return obj.id === formik.values.equipmentId;
    });

    if (prio?.equipmentPriority) {
      setEPriority(prio.equipmentPriority);
    }
  }, [equipmentList]);

  return (
    <div>
      <ThemeProvider theme={globalTheme}>
        <Button
          variant="contained"
          color="secondary"
          style={{ color: "white", maxWidth: "85px", margin: "5px" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Muokkaa
        </Button>
      </ThemeProvider>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Muokkaa: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Grid
                container
                spacing={3}
                column={3}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                padding={2}
              >
                <Grid item sx={12}>
                  <Typography sx={{ marginBottom: 2 }}>
                    Prioriteetin oletusarvo: {ePriority}
                  </Typography>
                  <TextField
                    error={
                      formik.touched.priority && formik.errors.priority
                        ? true
                        : false
                    }
                    name="priority"
                    label="Prioriteetti"
                    variant="outlined"
                    type="number"
                    value={formik.values.priority}
                    onChange={formik.handleChange("priority")}
                    onBlur={formik.handleBlur("priority")}
                    helperText={
                      formik.touched.priority && formik.errors.priority
                        ? formik.errors.priority
                        : null
                    }
                  />
                </Grid>
                <Grid item sx={12}>
                  <FormControl>
                    <FormLabel>Varusteen pakollisuus</FormLabel>
                    <RadioGroup
                      name="obligatory"
                      value={formik.values.obligatory}
                      onChange={formik.handleChange("obligatory")}
                      onBlur={formik.handleBlur("obligatory")}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="Pakollinen"
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Ei pakollinen"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "space-evenly", padding: "16px" }}
          >
            <ThemeProvider theme={globalTheme}>
              <Button
                variant="contained"
                color="red"
                style={{ color: "white" }}
                onClick={() => {
                  setOpen(false);
                  handleClose();
                }}
              >
                Peruuta
              </Button>

              <Button
                type="submit"
                style={{ color: "white" }}
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Muokkaa
              </Button>
            </ThemeProvider>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}