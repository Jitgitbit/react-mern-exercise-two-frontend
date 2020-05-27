import React, { useCallback, useReducer } from 'react';

import './NewPlace.css';

import Input from '../../shared/components/FormElements/Input';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';


const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false
      },
      description: {                               // ---> is basically the initial state !
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  // const titleInputHandler = (id, value, isValid) => {};      //------> DANGER ! INFINITE LOOP !
  const inputHandler = useCallback((id, value, isValid) => {         //--> no more infinite loop !
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, [dispatch]);                                 //--> here dispatch can actually be ommitted thx to react, I leave it for clarity.

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(`----->> formState.inputs says what?`,formState.inputs); // send this to the backend!
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}                                          //----> no more need for VALIDATOR_REQUIRE !
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <CustomButton type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </CustomButton>
    </form>
  );
};

export default NewPlace;
