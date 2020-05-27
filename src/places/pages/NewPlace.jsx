import React, { useCallback, useReducer } from "react";

import "./NewPlace.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";


const formReducer = (state, action) => {}


export default function NewPlace() {
  useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  // const titleInputHandler = (id, value, isValid) => {};      //------> DANGER ! INFINITE LOOP !
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);                             //--> no more infinite loop !
  const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);                             //--> no more infinite loop !

  return (
    <form className="place-form">
      <Input
        element="input"
        id="title"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={titleInputHandler}
      />
      <Input
        element="textarea"
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}                                     //----> no more need for VALIDATOR_REQUIRE !
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={descriptionInputHandler}
      />
    </form>
  );
}
