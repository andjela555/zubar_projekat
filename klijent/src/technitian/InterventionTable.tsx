import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'rsuite'
import { Intervention } from '../types'
import * as dateFns from 'date-fns'
interface Props {
  interventions: Intervention[]
}

export default function InterventionTable(props: Props) {
  return (
    <Table
      autoHeight
      data={props.interventions}
    >
      <Table.Column flexGrow={1}>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => {
              return (
                <Link to={'/intervention/' + intervention.id}>{intervention.id}</Link>
              )
            }
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.Cell dataKey='status' />
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Created at</Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => dateFns.format(new Date(intervention.createdAt), 'dd.MM.yyyy HH:mm')
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Start</Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => dateFns.format(new Date(intervention.start), 'dd.MM.yyyy HH:mm')
          }
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={3}>
        <Table.HeaderCell>End</Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => !intervention.end ? '/' : dateFns.format(new Date(intervention.end), 'dd.MM.yyyy HH:mm')
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>User </Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => (intervention.user.firstName + ' ' + intervention.user.lastName)
          }
        </Table.Cell>
      </Table.Column>
      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Dentist </Table.HeaderCell>
        <Table.Cell>
          {
            (intervention: any) => !intervention.dentist ? '/' : (intervention.dentist.firstName + ' ' + intervention.dentist.lastName)
          }
        </Table.Cell>
      </Table.Column>
    </Table>
  )
}
