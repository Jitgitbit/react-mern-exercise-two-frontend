import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import './PlaceForm.css'

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import CustomButton from '../../shared/components/FormElements/CustomButton';
import { useFormHook } from "../../shared/hooks/form-hook";


const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world.",
    imageUrl:
      "https://lh6.googleusercontent.com/proxy/e-uaRXnEw7eRiz_o1herqMfTZdHev2iBayVdC_P8qoYx5CbHTWVSmie0-qj1V9OCOU7Ijd8XWfeHROcz2SBRJMyqcX08KPx5l9XDMHBz80_JNOUKRZHCYt0fUF5pyo5QS9LfWmJmRsNVaLRKcCojMkVSdFlScJI=w408-h272-k-no",
    address: "20 W 34th St, New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Eiffel Tower",
    description: "One of the most famous monuments in the world.",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipP8E1nOUwx73CrO0pnZzHTk_O3dTyfzbN6aWnYt=w408-h256-k-no",
    address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    location: {
      lat: 48.8583701,
      lng: 2.2922926,
    },
    creator: "u2",
  },
];

export default function UpdatePlace() {

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useFormHook({
    title: {
      // value: identifiedPlace.title,
      value:'',
      // isValid: true
      isValid: false
    },
    description: {                               
      // value: identifiedPlace.description,
      value:'',
      // isValid: true
      isValid: false
    },
  // }, true);
  }, false);

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);     //--> placed under hook to simulate server delay !!!

  useEffect(() => {
    setFormData({
      title: {
        value: identifiedPlace.title,
        // value:'',
        isValid: true
        // isValid: false
      },
      description: {                               
        value: identifiedPlace.description,
        // value:'',
        isValid: true
        // isValid: false
      },
    }, true);
  }, [setFormData, identifiedPlace]);
  
  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(`----> update formState.inputs says what?`,formState.inputs)
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <CustomButton type="submit" disabled={!formState.isValid}>UPDATE PLACE</CustomButton>
    </form>
  );
}
