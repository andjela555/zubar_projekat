import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button, DatePicker, FlexboxGrid, Form, Input, InputPicker, Schema } from 'rsuite';
import { getOneIntervention, updateIntervention } from '../service/interventionService';
import { ChangeInterventinDto, Dentist, Intervention, Service } from '../types';
import './InterventionStyles.css';
import * as dateFns from 'date-fns'
import { getDentists } from '../service/dentistService';
import { getAllServices } from '../service/servicesService';

const initialState = {
  serviceId: null as number | null,
  quantity: 0
}

const model = Schema.Model({
  serviceId: Schema.Types.NumberType().isRequired(),
  quantity: Schema.Types.NumberType().isRequired().min(1)
})

export default function InterventionShowPage() {
  const params = useParams();
  const id = Number(params.id)
  const [intervention, setIntervention] = useState<Intervention | undefined>(undefined);
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [services, setServices] = useState<Service[]>([]);
  const [formState, setFormState] = useState(initialState)
  const navigate = useNavigate();
  useEffect(() => {
    getOneIntervention(Number(id))
      .then(setIntervention)
      .catch(() => {
        navigate('/');
      });
  }, [id, navigate]);

  useEffect(() => {
    getDentists().then(setDentists);
    getAllServices().then(setServices)
  }, [])

  if (!intervention) {
    return null;
  }

  const changeField = (field: keyof ChangeInterventinDto) => async (value: any) => {
    const i1 = await updateIntervention(Number(id), {
      [field]: value
    });
    if (!i1) {
      return;
    }
    setIntervention(i1);
  }
  return (
    <div className='container'>
      <FlexboxGrid justify='space-between'>
        <FlexboxGrid.Item className='paddingAll' colspan={10}>
          <div className='card'>
            <div className='cardHeader'>
              Intervention with id {id}
            </div>
            <div className='cardItem'>
              <div>
                Created at
              </div>
              <div>
                {dateFns.format(new Date(intervention.createdAt), 'dd.MM.yyyy HH:mm')}
              </div>
            </div>
            <div className='cardItem'>
              <div>
                Start
              </div>
              <div>
                <DatePicker
                  format='dd.MM.yyyy HH:mm'
                  placeholder='Start'
                  onChange={changeField('start')}
                  value={new Date(intervention.start)}
                />
              </div>
            </div>
            <div className='cardItem'>
              <div>
                End
              </div>
              <div>
                <DatePicker
                  format='dd.MM.yyyy HH:mm'
                  placeholder='End'
                  onChange={changeField('end')}
                  value={intervention.end ? new Date(intervention.end) : null}
                />
              </div>
            </div>
            <div className='cardItem'>
              <div>
                Status
              </div>
              <div>
                <InputPicker
                  placeholder='Status'
                  onChange={changeField('status')}
                  value={intervention.status}
                  cleanable={false}
                  data={[
                    {
                      value: 'pending',
                      label: 'pending'
                    },
                    {
                      value: 'accepted',
                      label: 'accepted'
                    },
                    {
                      value: 'rejected',
                      label: 'rejected'
                    },
                    {
                      value: 'finished',
                      label: 'finished'
                    }
                  ]}
                />
              </div>
            </div>
            <div className='cardItem'>
              <div>
                Dentist
              </div>
              <div>
                <InputPicker
                  placeholder='Select dentist'
                  onChange={changeField('dentistId')}
                  value={intervention.dentist ? intervention.dentist.id : null}
                  data={dentists.map(element => {
                    return {
                      value: element.id,
                      label: element.firstName + ' ' + element.lastName
                    }
                  })}
                />
              </div>
            </div>
            <div className='cardItem'>
              <div>
                User
              </div>
              <div>
                {intervention.user.firstName + ' ' + intervention.user.lastName}
              </div>
            </div>
            <div className='cardItem'>
              <div>
                User email
              </div>
              <div>
                {intervention.user.email}
              </div>
            </div>
            <div className='cardItem'>
              <div>
                User birth date
              </div>
              <div>
                {dateFns.format(new Date(intervention.user.birthDate), 'dd.MM.yyyy HH:mm')}
              </div>
            </div>

          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='paddingAll' colspan={12}>
          <div className='card'>
            <div className='cardHeader'>
              Items
            </div>
            {
              intervention.items.map(item => {
                return (
                  <div className='cardItem'>
                    <div>
                      {item.service.name}
                    </div>
                    <div>
                      {item.unitPrice}
                    </div>
                    <div>
                      <Input
                        type='number'
                        min={1}
                        onChange={async (val) => {
                          const res = await updateIntervention(id, {
                            items: [
                              {
                                type: 'UPDATE',
                                id: item.id,
                                quantity: Number(val)
                              }
                            ]
                          })
                          setIntervention(res);
                        }}
                        value={item.quantity}
                      />
                    </div>
                    <div>
                      <Button
                        onClick={async () => {
                          const res = await updateIntervention(id, {
                            items: [
                              {
                                type: 'DELETE',
                                id: item.id
                              }
                            ]
                          })
                          setIntervention(res);
                        }}
                        appearance='primary' color='red'>Delete</Button>
                    </div>
                  </div>
                )
              })
            }

          </div>
          <div className='padding'>
            <div className='header'>
              Add service
            </div>
            <Form
              model={model}
              fluid
              formValue={formState}
              onChange={(val: any) => {
                setFormState(val);
              }}
              onSubmit={async (valid) => {
                if (!valid) {
                  return;
                }
                const res = await updateIntervention(id, {
                  items: [{
                    type: 'CREATE',
                    quantity: formState.quantity,
                    serviceId: formState.serviceId || undefined
                  }]
                });
                setIntervention(res);
                setFormState(initialState);
              }}
            >
              <Form.Group>
                <Form.ControlLabel>Service</Form.ControlLabel>
                <Form.Control
                  name='serviceId'
                  className='fluid'
                  accepter={InputPicker}
                  data={services.filter(service => {
                    return intervention.items.find(i => i.service.id === service.id) === undefined
                  })
                    .map(service => {
                      return {
                        value: service.id,
                        label: service.name
                      }
                    })}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Quantity</Form.ControlLabel>
                <Form.Control
                  name='quantity'
                  type='number'
                />
              </Form.Group>
              <Button appearance='primary' type='submit' >Save</Button>
            </Form>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  )
}
