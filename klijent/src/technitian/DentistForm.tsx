import React, { useEffect, useState } from 'react'
import { Button, Form, InputPicker, Modal, Schema } from 'rsuite'
import { Dentist, Ordination } from '../types'


const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired().containsLetterOnly(),
  lastName: Schema.Types.StringType().isRequired().containsLetterOnly(),
  phone: Schema.Types.StringType().isRequired(),
  ordinationId: Schema.Types.NumberType().isRequired(),
})

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  ordinationId: null as number | null,
}

interface Props {
  open: boolean,
  onClose: () => void,
  onSubmit: (data: any) => Promise<void>,
  ordinations: Ordination[],
  dentist?: Dentist
}
export default function DentistForm(props: Props) {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (!props.open) {
      return;
    }
    if (props.dentist) {
      setFormState({
        firstName: props.dentist.firstName,
        lastName: props.dentist.lastName,
        phone: props.dentist.phone,
        ordinationId: props.dentist.ordination.id
      })
    } else {
      setFormState(initialState);
    }
  }, [props.dentist, props.open])

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
    >
      <Modal.Header>
        <Modal.Title className='header'>{props.dentist ? 'Update' : 'Create'} dentist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          fluid
          formValue={formState}
          onChange={(val: any) => {
            setFormState(val);
          }}
          onSubmit={async (valid) => {
            if (!valid) {
              return;
            }
            await props.onSubmit(formState);
            setFormState(initialState);
            props.onClose();
          }}
          model={model}
        >
          <Form.Group>
            <Form.ControlLabel>First name</Form.ControlLabel>
            <Form.Control name='firstName' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Last name</Form.ControlLabel>
            <Form.Control name='lastName' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Phone</Form.ControlLabel>
            <Form.Control name='phone' />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Ordination</Form.ControlLabel>
            <Form.Control
              name='ordinationId'
              accepter={InputPicker}
              data={props.ordinations.map(element => {
                return {
                  value: element.id,
                  label: element.address
                }
              })}
            />
          </Form.Group>
          <Button appearance='primary' type='submit'>{props.dentist ? 'Update' : 'Create'} dentist</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
