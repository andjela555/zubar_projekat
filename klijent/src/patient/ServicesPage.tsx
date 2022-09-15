import React, { useEffect, useState } from 'react'
import { FlexboxGrid } from 'rsuite';
import { getAllServices } from '../service/servicesService';
import { Service } from '../types';
import ServiceCard from './ServiceCard';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getAllServices().then(setServices);
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        Our services
      </div>
      <FlexboxGrid justify='space-between'>
        {
          services.map(element => {
            return (
              <FlexboxGrid.Item className='padding' colspan={7}>
                <ServiceCard service={element} />
              </FlexboxGrid.Item>
            )
          })
        }
      </FlexboxGrid>
    </div>
  )
}
