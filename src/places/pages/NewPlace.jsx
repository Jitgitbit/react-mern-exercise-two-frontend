import React, { useCallback, useReducer } from "react";

import "./NewPlace.css";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";


const formReducer = (state, action) => {
  switch(action.type){
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for(const inputId in state.inputs){
        if(inputId === action.inputId){
          formIsValid = formIsValid && action.isValid;
        }else{
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return{
        ...state,
        input: {
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      }
    default:
      return state;
  }
}


export default function NewPlace() {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {                        // ---> is basically the initial state !
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  // const titleInputHandler = (id, value, isValid) => {};      //------> DANGER ! INFINITE LOOP !
  const inputHandler = useCallback((id, value, isValid) => {          //--> no more infinite loop !
    dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  }, []);                             
  // const descriptionInputHandler = useCallback((id, value, isValid) => {}, []);                             

  return (
    <form className="place-form">
      <Input
        element="input"
        id="title"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}                                     //----> no more need for VALIDATOR_REQUIRE !
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
    </form>
  );
}
