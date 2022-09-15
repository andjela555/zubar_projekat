import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import { createDentist, deleteDentist, getDentists, updateDentist } from '../service/dentistService';
import { getAllOrdinations } from '../service/ordinationService';
import { Dentist, Ordination } from '../types';
import DentistForm from './DentistForm';
import DentistsTable from './DentistsTable';

export default function DentistsPage() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [ordinations, setOrdinations] = useState<Ordination[]>([])
  const [openForm, setOpenForm] = useState(false);
  const [selectedDentistId, setSelectedDentistId] = useState(0);
  useEffect(() => {
    getDentists().then(setDentists)
    getAllOrdinations().then(setOrdinations)
  }, [])

  return (
    <div className='container'>
      <DentistForm
        dentist={dentists.find(d => d.id === selectedDentistId)}
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedDentistId(0);
        }}
        onSubmit={async (data) => {
          if (selectedDentistId) {
            const dentist = await updateDentist(selectedDentistId, data);
            setDentists(prev => {
              return prev.map(element => {
                if (element.id === selectedDentistId) {
                  return dentist;
                }
                return element;
              })
            })
            return;
          }
          const dentist = await createDentist(data);
          setDentists(prev => {
            return [
              ...prev,
              dentist
            ]
          })
        }}
        ordinations={ordinations}
      />
      <div className='header'>
        Dentists page
      </div>
      <div>
        <Button
          appearance='primary'
          onClick={() => { setOpenForm(true) }}
        >Create dentist</Button>
      </div>
      <DentistsTable
        dentists={dentists}
        onChange={dentist => {
          setSelectedDentistId(dentist.id);
          setOpenForm(true);
        }}
        onDelete={async dentist => {
          await deleteDentist(dentist.id);
          setDentists(prev => {
            return prev.filter(d => d !== dentist);
          })
        }}
      />
    </div>
  )
}
