import React from 'react'
import { Intervention } from '../types'
import './Intervention.css';
import * as dateFns from 'date-fns'
interface Props {
  intervention: Intervention;
}

export default function InterventionCard(props: Props) {
  return (
    <div className='intervention-card'>
      <div className='item'>
        Status: {props.intervention.status}
      </div>
      <div className='item'>
        Date: {dateFns.format(new Date(props.intervention.start), 'dd.MM.yyyy HH:mm')} {props.intervention.end ? `- ${dateFns.format(new Date(props.intervention.end), 'dd.MM.yyyy HH:mm')}` : ''}
      </div>
      <div className='item'>
        Dentist: {props.intervention.dentist ? props.intervention.dentist.firstName + ' ' + props.intervention.dentist.lastName : ''}
      </div>
      <div className='item'>
        Items
        <div>
          {
            props.intervention.items.map(item => {
              return (
                <div className='miniItem'>
                  {item.service.name}
                  <div className='price'>
                    <div>
                      {item.unitPrice} RSD
                    </div>
                    <div>
                      {item.quantity}
                    </div>
                    <div>
                      {item.quantity * item.unitPrice} RSD
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='item'>
        Total price: {props.intervention.items.reduce((acc, element) => acc + element.quantity * element.unitPrice, 0)} RSD
      </div>
    </div>
  )
}
