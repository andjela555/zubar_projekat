

import React from 'react'
import { Service } from '../types'

interface Props {
  service: Service
}

export default function ServiceCard(props: Props) {
  return (
    <div className='serviceCard'>
      <div className='serviceCardHeader'>{props.service.name}</div>
      <div className='serviceCardPrice'>Price:{props.service.price} RSD</div>
      <div className='serviceCardDesc'>
        {props.service.description}
      </div>
    </div>
  )
}
