import React, { useState } from "react";

import "./PlaceItem.css";

import Card from "../../shared/components/UIElements/Card";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

export default function PlaceItem(props) {

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...')
  }

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<CustomButton onClick={closeMapHandler}>CLOSE</CustomButton>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal onCancel={cancelDeleteHandler} show={showConfirmModal} header="Are you sure?" footerClass="place-item__modal-actions" footer={
        <React.Fragment>
          <CustomButton inverse onClick={cancelDeleteHandler}>CANCEL</CustomButton>
          <CustomButton danger onClick={confirmDeleteHandler}>DELETE</CustomButton>
        </React.Fragment>
      }>
        <p>Do you want to proceed and delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <CustomButton inverse onClick={openMapHandler}>VIEW ON MAP</CustomButton>
            <CustomButton to={`/places/${props.id}`}>EDIT</CustomButton>
            <CustomButton danger onClick={showDeleteWarningHandler}>DELETE</CustomButton>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}
