import React, { useState } from 'react'
import { FlexboxGrid, Form, Button, DatePicker, Schema } from 'rsuite'
import { Link } from 'react-router-dom'

interface Props {
  onRegister: (data: any) => void
}

const model = Schema.Model({
  email: Schema.Types.StringType().isEmail().isRequired(),
  password: Schema.Types.StringType().isRequired(),
  firstName: Schema.Types.StringType().isRequired(),
  lastName: Schema.Types.StringType().isRequired(),
  birthDate: Schema.Types.DateType().isRequired(),
  repeat: Schema.Types.StringType().isRequired().addRule((value, form) => {
    return value === form.password
  }, 'Repeat is not same as password', true)
})

export default function RegisterPage(props: Props) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthDate: null,
    repeat: ''
  });
  return (
    <div>
      <FlexboxGrid justify='center'>
        <FlexboxGrid.Item colspan={8}>
          <div className='header'>
            Register
          </div>
          <Form
            model={model}
            fluid
            formValue={formState}
            onChange={(val: any) => {
              setFormState(val);
            }}
            onSubmit={(valid: boolean) => {
              if (!valid) {
                return;
              }
              props.onRegister(formState);
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name='email' type='email' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>First name</Form.ControlLabel>
              <Form.Control name='firstName' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Last name</Form.ControlLabel>
              <Form.Control name='lastName' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Birth date</Form.ControlLabel>
              <Form.Control
                name='birthDate'
                accepter={DatePicker}
                oneTap
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Form.Control name='password' type='password' />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Repeat password</Form.ControlLabel>
              <Form.Control name='repeat' type='password' />
            </Form.Group>
            <FlexboxGrid justify='space-between'>
              <FlexboxGrid.Item>
                <Button appearance='primary' type='submit' >Register</Button>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Link to='/'>
                  <Button appearance='primary' color='violet' type='button' >Already have an account?</Button>
                </Link>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
