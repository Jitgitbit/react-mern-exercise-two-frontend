import React, { useState } from 'react'

import './Auth.css'

import { useFormHook } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import CustomButton from '../../shared/components/FormElements/CustomButton';


export default function Auth() {

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler] = useFormHook({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    }
  }, false);

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(`--->> auth inputs say what?`,formState.inputs);
  }
  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  }

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr/>
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <CustomButton type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </CustomButton>
      </form>
      <CustomButton inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </CustomButton>
    </Card>
  )
}
