import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
          continue;
        }
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default:
      return state;
  }
};

export const useFormHook = (initialInputs, initialFormValidity) => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs  ,
    isValid: initialFormValidity
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

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    })
  }, []);

  return [formState, inputHandler, setFormData];
};