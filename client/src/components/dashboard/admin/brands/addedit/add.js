import React, { useEffect, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";

import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from "utils/loader";
import { brandValidation } from "./formValues";

import { useDispatch, useSelector } from "react-redux";

import { TextField, Button, Divider } from "@material-ui/core";
import { brandAdd } from "store/actions/brands.actions";

const AddBrand = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      brandname: "",
    },
    validationSchema: brandValidation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(brandAdd(values));
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard/admin/admin_products");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, props.history]);
  return (
    <DashboardLayout title="Add brand">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Divider className="mt-3 mb-3" />

          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="brandname"
                label="Enter a brand name"
                variant="outlined"
                {...formik.getFieldProps("brandname")}
                {...errorHelper(formik, "brandname")}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Add brand
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddBrand;
