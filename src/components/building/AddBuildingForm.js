import React from "react"; // { useState, useEffect } ???
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";

export default function AddBuildingForm(props) {
  const { formik, submitValues, setInitialBuilding } = props;

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
          column={8}
          justifyContent="space-evenly"
          alignItems="center"
          padding={1}
        >
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={formik.touched.name && formik.errors.name ? true : false}
              name="name"
              label="Building name"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              error={
                formik.touched.description && formik.errors.description
                  ? true
                  : false
              }
              name="description"
              label="Description"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              helperText={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />
          </Grid>
        </Grid>
        <Grid item xs={3} padding={2}>
          <Button
            type="submit"
            variant="contained"
            style={{ color: "white" }}
            onClick={() => {
              setInitialBuilding(submitValues);
            }}
          >
            Add
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
}
