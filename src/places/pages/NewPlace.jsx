import React from 'react';

import './PlaceForm.css';

import Input from '../../shared/components/FormElements/Input';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useFormHook } from '../../shared/hooks/form-hook';


const NewPlace = () => {

  const [formState, inputHandler] = useFormHook(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {                               
        value: '',
        isValid: false
      },
      address: {                               
        value: '',
        isValid: false
      }
    }, false
  );
  
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
