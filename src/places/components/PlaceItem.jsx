import React, { useState } from "react";

import "./PlaceItem.css";

import Card from "../../shared/components/UIElements/Card";
import CustomButton from "../../shared/components/FormElements/CustomButton";
import Modal from "../../shared/components/UIElements/Modal";

export default function PlaceItem(props) {
  
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

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
          <h2>THE MAP</h2>
        </div>
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
            <CustomButton danger>DELETE</CustomButton>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}
