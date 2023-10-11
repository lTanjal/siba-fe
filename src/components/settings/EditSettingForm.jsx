import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function EditSettingForm({ formik }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Dialog open={open}>
        <form onSubmit={formik.handleSubmit}>
          {/* formik.initialValues?.subjectName} Here ? checks
              if the subjectName attribute can be found
              in the initialValues object,
              if not found returns an empty string and does not crash */}
          <DialogTitle>Edit: {formik.initialValues?.name}</DialogTitle>
          <DialogContent>
            <Grid container variant="sibaGridEdit" spacing={3} column={7}>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  name="name"
                  label="Setting name"
                  variant="outlined"
                  value={formik.values?.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur("name")}
                  helperText={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.description && formik.errors.description
                      ? true
                      : false
                  }
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formik.values?.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  helperText={
                    formik.touched.description && formik.errors.description
                      ? formik.errors.description
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.numberValue && formik.errors.numberValue
                      ? true
                      : false
                  }
                  name="numberValue"
                  label="numberValue"
                  variant="outlined"
                  value={formik.values?.numberValue}
                  onChange={formik.handleChange("numberValue")}
                  onBlur={formik.handleBlur("numberValue")}
                  helperText={
                    formik.touched.numberValue && formik.errors.numberValue
                      ? formik.errors.numberValue
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    formik.touched.textValue && formik.errors.textValue
                      ? true
                      : false
                  }
                  name="textValue"
                  label="textValue"
                  variant="outlined"
                  value={formik.values?.textValue}
                  onChange={formik.handleChange("textValue")}
                  onBlur={formik.handleBlur("textValue")}
                  helperText={
                    formik.touched.numberValue && formik.errors.textValue
                      ? formik.errors.textValue
                      : ""
                  }
                />
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
              color="red"
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