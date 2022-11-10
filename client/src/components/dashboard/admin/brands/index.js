import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { brandsByPaginate, brandRemove } from "store/actions/brands.actions";
import BrandsTable from "./brandsTable";

const defaultValues = {
  keywords: "",
  page: 1,
};

const AdminBrands = (props) => {
  const [removeModal, setRemoveModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const brands = useSelector((state) => state.brands);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );
  const gotoEdit = (id) => {
    props.history.push(`/dashboard/admin/edit_brand/${id}`);
  };

  const gotoPage = (page) => {
    setSearchValues({ page: page });
  };

  const handleCose = () => {
    setRemoveModal(false);
  };

  const handleModal = (id) => {
    setToRemove(id);
    setRemoveModal(true);
  };

  const handleRemove = () => {
    dispatch(brandRemove(toRemove));
  };
  useEffect(() => {
    dispatch(brandsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  useEffect(() => {
    handleCose();
    setRemoveModal(null);
    if (notifications && notifications.removeArticle) {
      dispatch(brandsByPaginate(searchValues));
    }
  }, [dispatch, notifications, searchValues]);

  return (
    <DashboardLayout title="Brands">
      <div className="products_table">
        <hr />
        <BrandsTable
          removeModal={removeModal}
          brands={brands.byPaginate}
          prev={(page) => gotoPage(page)}
          next={(page) => gotoPage(page)}
          gotoEdit={(id) => gotoEdit(id)}
          handleClose={() => handleCose()}
          handleModal={(id) => handleModal(id)}
          handleRemove={() => handleRemove()}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminBrands;
