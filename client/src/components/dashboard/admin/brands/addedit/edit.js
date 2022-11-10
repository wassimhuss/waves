import React, { useEffect, useState } from "react";
import PicUpload from "./upload";
import PicViewer from "./picViewer";
import DashboardLayout from "hoc/dashboardLayout";

import { useFormik } from "formik";
import { errorHelper } from "utils/tools";
import Loader from "utils/loader";
import { brandValidation, formValues, getBrandsToEdit } from "./formValues";

import { useDispatch, useSelector } from "react-redux";
import {
  brandEdit,
  brandsById,
  getAllBrands,
} from "store/actions/brands.actions";
import { productEdit, productsById } from "store/actions/product.actions";
import { clearCurrentProduct } from "store/actions/index";

import {
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

const AddBrand = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const brands = useSelector((state) => state.brands);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: brandValidation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(brandEdit(values, props.match.params.id));
  };

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    const param = props.match.params.id;
    dispatch(getAllBrands());
    if (param) {
      dispatch(brandsById(param));
    }
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (brands && brands.byId) {
      setValues(getBrandsToEdit(brands.byId));
    }
  }, [brands]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch]);

  return (
    <DashboardLayout title="Add product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="name"
                label="Enter a brand name"
                variant="outlined"
                {...formik.getFieldProps("name")}
                {...errorHelper(formik, "name")}
              />
            </div>
            <Divider className="mt-3 mb-3" />

            <Button variant="contained" color="primary" type="submit">
              Edit brand
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddBrand;
