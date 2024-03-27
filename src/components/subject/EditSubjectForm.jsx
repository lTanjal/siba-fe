import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function EditSubjectForm({
  programSelectList,
  formik,
  spaceTypeSelectList,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        className="editButton"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ maxWidth: "300px" }}>
            Edit: {formik.initialValues?.name}
          </DialogTitle>
          <DialogContent>
            <Grid container variant="sibaGridEdit" spacing={3} column={7}>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="name"
                  label="Name of the lesson"
                  defaultValue={formik.initialValues?.name}
                  variant="outlined"
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.groupSize && formik.errors.groupSize
                      ? true
                      : false
                  }
                  name="groupSize"
                  label="Group size"
                  defaultValue={formik.initialValues?.groupSize}
                  variant="outlined"
                  onChange={formik.handleChange("groupSize")}
                  onBlur={formik.handleBlur("groupSize")}
                  helperText={
                    formik.touched.groupSize && formik.errors.groupSize
                      ? formik.errors.groupSize
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.groupCount && formik.errors.groupCount
                      ? true
                      : false
                  }
                  name="groupCount"
                  label="Group count"
                  defaultValue={formik.initialValues?.groupCount}
                  variant="outlined"
                  onChange={formik.handleChange("groupCount")}
                  onBlur={formik.handleBlur("groupCount")}
                  helperText={
                    formik.touched.groupCount && formik.errors.groupCount
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.sessionLength && formik.errors.sessionLength
                      ? true
                      : false
                  }
                  name="sessionLength"
                  label="Length of lesson(hh:mm)"
                  defaultValue={formik.initialValues?.sessionLength}
                  variant="outlined"
                  onChange={formik.handleChange("sessionLength")}
                  onBlur={formik.handleBlur("sessionLength")}
                  helperText={
                    formik.touched.sessionLength && formik.errors.sessionLength
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.sessionCount && formik.errors.sessionCount
                      ? true
                      : false
                  }
                  name="sessionCount"
                  label="Number of sessions per week"
                  defaultValue={formik.initialValues?.sessionCount}
                  variant="outlined"
                  onChange={formik.handleChange("sessionCount")}
                  onBlur={formik.handleBlur("sessionCount")}
                  helperText={
                    formik.touched.sessionCount && formik.errors.sessionCount
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.area && formik.errors.area ? true : false
                  }
                  name="area"
                  label="Required square meters"
                  defaultValue={formik.initialValues?.area}
                  variant="outlined"
                  onChange={formik.handleChange("area")}
                  onBlur={formik.handleBlur("area")}
                  helperText={formik.touched.area && formik.errors.area}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Program</InputLabel>
                  <Select
                    error={
                      formik.touched.programId && formik.errors.programId
                        ? true
                        : false
                    }
                    name="programId"
                    defaultValue={formik.initialValues?.programId}
                    onChange={formik.handleChange("programId")}
                    onBlur={formik.handleBlur("programId")}
                  >
                    {programSelectList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>
                    {formik.touched.programId && formik.errors.programId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Space type</InputLabel>
                  <Select
                    name="spaceTypeId"
                    defaultValue={formik.initialValues?.spaceTypeId}
                    onChange={formik.handleChange("spaceTypeId")}
                    onBlur={formik.handleBlur("spaceTypeId")}
                  >
                    {spaceTypeSelectList.map((value) => {
                      return (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                // Let's reset the form if you press cancel
                formik.resetForm();
              }}
              variant="contained"
              className="redButton"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
