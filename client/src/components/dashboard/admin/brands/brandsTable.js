import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Moment from "react-moment";
import Loading from "utils/loader";

const BrandsTable = ({
  brands,
  prev,
  next,
  gotoEdit,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
}) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <>
      {brands && brands.docs ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand Name</th>
              </tr>
            </thead>
            <tbody>
              {brands.docs.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleModal(item._id)}
                  >
                    Remove
                  </td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => gotoEdit(item._id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {brands.hasPrevPage ? (
              <>
                <Pagination.Prev
                  onClick={() => goToPrevPage(brands.prevPage)}
                />
                <Pagination.Item onClick={() => goToPrevPage(brands.prevPage)}>
                  {brands.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active>{brands.page}</Pagination.Item>
            {brands.hasNextPage ? (
              <>
                <Pagination.Item onClick={() => goToNextPage(brands.nextPage)}>
                  {brands.nextPage}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => goToNextPage(brands.nextPage)}
                />
              </>
            ) : null}
          </Pagination>
          <hr />
          <LinkContainer to="/dashboard/admin/add_brands">
            <Button variant="secondary">Add brand</Button>
          </LinkContainer>
        </>
      ) : (
        <Loading />
      )}

      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you really sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>There is no going back.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Oops, close this now !!
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BrandsTable;
