
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sidenav, Nav, Button } from 'rsuite'
import { User } from '../types'
interface Props {
  user: User,
  onLogout: () => void
}

export default function TechnitianNavigation(props: Props) {
  return (
    <Sidenav className='navigation'>
      <Sidenav.Header className='header'>
        Hello {props.user.firstName + ' ' + props.user.lastName}
      </Sidenav.Header>
      <Sidenav.Body>
        <Nav className='navBody'>
          <Nav.Item
            as={NavLink}
            to='/'
          >
            Interventions
          </Nav.Item>
          <Nav.Item
            as={NavLink}
            to='/dentists'
          >
            Dentists
          </Nav.Item>
          <Nav.Item
            as={NavLink}
            to='/statistics'
          >
            Statistics
          </Nav.Item>
          <Nav.Item>
            <Button
              onClick={props.onLogout}
              appearance='primary'
              color='cyan'
            >Logout</Button>
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  )
}
