import React, { useEffect, useState } from "react";
import {
    Button,
    Modal,
  } from "react-bootstrap";


function ConfirmPopup(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const enrollCall = () =>{
      setShow(false);
      props.onreload(props.postId);
    };

    const handleShow = () => setShow(true);
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
            Add To Community 
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Are sure you want to enroll this {props.type} into the Community?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              NO
            </Button>
            <Button variant="primary" onClick={enrollCall}>YES</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ConfirmPopup;