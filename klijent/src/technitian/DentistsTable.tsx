import React from 'react'
import { Button, ButtonGroup, Table } from 'rsuite'
import { Dentist } from '../types'

interface Props {
  dentists: Dentist[],
  onChange: (dentist: Dentist) => void,
  onDelete: (dentist: Dentist) => void,
}

export default function DentistsTable(props: Props) {
  return (
    <Table
      autoHeight
      data={props.dentists}
      rowHeight={60}
    >
      <Table.Column flexGrow={1} >
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey='id' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>First name</Table.HeaderCell>
        <Table.Cell dataKey='firstName' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>Last name</Table.HeaderCell>
        <Table.Cell dataKey='lastName' />
      </Table.Column>
      <Table.Column flexGrow={2} >
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.Cell dataKey='phone' />
      </Table.Column>
      <Table.Column flexGrow={4} >
        <Table.HeaderCell>Ordination</Table.HeaderCell>
        <Table.Cell dataKey='ordination.address' />
      </Table.Column>
      <Table.Column flexGrow={3} >
        <Table.HeaderCell>Actions</Table.HeaderCell>
        <Table.Cell>
          {
            (dentist: any) => {
              return (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      props.onChange(dentist);
                    }}
                    appearance='primary' color='cyan'>Change</Button>
                  <Button
                    onClick={() => {
                      props.onDelete(dentist);
                    }}
                    appearance='primary' color='red'>Delete</Button>
                </ButtonGroup>
              )
            }
          }
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
