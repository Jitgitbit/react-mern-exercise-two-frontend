import React from 'react'

import './Auth.css'

import { useFormHook } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import CustomButton from '../../shared/components/FormElements/CustomButton';


export default function Auth() {

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

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr/>
      <form>
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
        <CustomButton type="submit" disabled={!formState.isValid}>LOGIN</CustomButton>
      </form>
    </Card>
  )
}
