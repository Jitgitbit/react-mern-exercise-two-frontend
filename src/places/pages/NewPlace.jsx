import React from "react";

import "./NewPlace.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

export default function NewPlace() {

  const titleInputHandler = (id, value, isValid) => {};      //------> DANGER ! INFINITE LOOP !

  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title."
        onInput={titleInputHandler}
      />
    </form>
  );
}
