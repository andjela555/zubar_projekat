import React, { useEffect, useState } from 'react'
import { getTechnitianInterventions } from '../service/interventionService';
import { InterventionResult } from '../types'
import InterventionTable from './InterventionTable';

export default function InterventionPage() {
  const [interventionResult, setInterventionResult] = useState<InterventionResult>({ interventions: [], totalElements: 0 });

  useEffect(() => {
    getTechnitianInterventions().then(setInterventionResult)
  }, [])

  return (
    <div className='container'>
      <div className='header'>
        Interventions
      </div>
      <InterventionTable interventions={interventionResult.interventions} />
    </div>
  )
}
