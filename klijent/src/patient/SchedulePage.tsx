import React, { useEffect, useState } from 'react'
import { Button, Checkbox, CheckboxGroup, DatePicker, FlexboxGrid, Form, InputPicker, useToaster, Notification, Schema } from 'rsuite';
import { getDentists } from '../service/dentistService';
import { createIntervention } from '../service/interventionService';
import { getAllOrdinations } from '../service/ordinationService';
import { getAllServices } from '../service/servicesService';
import { Dentist, Ordination, Service } from '../types'

const initialState = {
  start: null as Date | null,
  dentistId: null as number | null,
  serviceIds: [] as number[]
}

const model = Schema.Model({
  start: Schema.Types.DateType().isRequired().min(new Date()),
  serviceIds: Schema.Types.ArrayType()
})

export default function SchedulePage() {
  const [ordinations, setOrdinations] = useState<Ordination[]>([])
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedOrdinationId, setSelectedOrdinationId] = useState(0);
  const selectedOrdination = ordinations.find(e => e.id === selectedOrdinationId);
  const [formState, setFormState] = useState(initialState);
  const toaster = useToaster();
  useEffect(() => {
    getAllServices().then(setServices);
    getDentists().then(setDentists);
    getAllOrdinations().then(setOrdinations);
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        Schedule an intervention
      </div>
      <FlexboxGrid justify='space-between'>
        <FlexboxGrid.Item colspan={10}>
          <Form
            fluid
            model={model}
            formValue={formState}
            onChange={(val: any) => {
              setFormState(val);
            }}
            onSubmit={async (valid) => {
              if (!valid) {
                return;
              }
              try {
                const res = await createIntervention(formState);
                toaster.push((
                  <Notification type='error'>You have successfully sent a request for intervention</Notification>
                ), { placement: 'topCenter' })
              } catch (error: any) {
                toaster.push((
                  <Notification type='error'>{error.response.data.error}</Notification>
                ), { placement: 'topCenter' })
              }
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Select date</Form.ControlLabel>
              <Form.Control
                name='start'
                className='fluid'
                accepter={DatePicker}
                format='dd.MM.yyyy HH:mm'
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Select dentist</Form.ControlLabel>
              <Form.Control
                name='dentistId'
                className='fluid'
                accepter={InputPicker}
                data={dentists.filter(d => d.ordination.id === selectedOrdinationId).map(element => {
                  return {
                    value: element.id,
                    label: element.firstName + ' ' + element.lastName
                  }
                })}
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Select services</Form.ControlLabel>
              <Form.Control
                name='serviceIds'
                className='fluid'
                accepter={CheckboxGroup}
              >
                {
                  services.map(element => {
                    return (
                      <Checkbox value={element.id}>{element.name} ({element.price} RSD)</Checkbox>
                    )
                  })
                }
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Estimated price</Form.ControlLabel>
              <Form.Control name='' readOnly
                value={services
                  .filter(s => formState.serviceIds.includes(s.id))
                  .reduce((acc, element) => acc + element.price, 0) + ' RSD'
                }
              />
            </Form.Group>
            <Button
              appearance='primary'
              type='submit'
            >Submit</Button>
          </Form>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <div>
            <Form.ControlLabel>Ordination</Form.ControlLabel>
            <InputPicker
              className='fluid'
              value={selectedOrdinationId}
              onChange={setSelectedOrdinationId}
              data={ordinations.map(element => {
                return {
                  value: element.id,
                  label: element.address
                }
              })}
            />
          </div>
          {
            selectedOrdination && (
              <div>
                <div className='ordinationProp'>
                  Email:{selectedOrdination.email}
                </div>
                <div className='ordinationProp'>
                  Address:{selectedOrdination.address}
                </div>
                <div className='ordinationProp'>
                  Phone:{selectedOrdination.phone}
                </div>
              </div>
            )
          }
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
