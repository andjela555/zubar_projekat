import React, { useEffect, useState } from 'react'
import { FlexboxGrid } from 'rsuite'
import { getPatientInterventions } from '../service/interventionService'
import { Intervention } from '../types'
import InterventionCard from './InterventionCard'

export default function HistoryPage() {
  const [interventions, setInterventions] = useState<Intervention[]>([])

  useEffect(() => {
    getPatientInterventions().then(setInterventions)
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        Intervetion history
      </div>
      <FlexboxGrid justify='space-between'>
        {
          interventions.map(intervention => {
            return (
              <FlexboxGrid.Item key={intervention.id} colspan={11}>
                <InterventionCard intervention={intervention} />
              </FlexboxGrid.Item>
            )
          })
        }
      </FlexboxGrid>
    </div>
  )
}
