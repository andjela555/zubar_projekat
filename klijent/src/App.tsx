import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './types';
import { Route, Routes } from 'react-router';
import { useToaster, Notification, FlexboxGrid } from 'rsuite'
import LoginPage from './auth/LoginPage';
import 'rsuite/dist/rsuite.min.css'
import { checkUser, loginUser, registerUser } from './service/authService';
import axios from 'axios'
import RegisterPage from './auth/RegisterPage';
import Navigation from './patient/Navigation';
import HomePage from './patient/HomePage';
import TechnitianNavigation from './technitian/TechnitianNavigation';
import DentistsPage from './technitian/DentistsPage';
import ServicesPage from './patient/ServicesPage';
import SchedulePage from './patient/SchedulePage';
import StatisticsPage from './technitian/StatisticsPage';
import HistoryPage from './patient/HistoryPage';
import InterventionPage from './technitian/InterventionPage';
import InterventionShowPage from './technitian/InterventionShowPage';

axios.defaults.baseURL = 'http://localhost:8000'

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const toaster = useToaster();

  useEffect(() => {
    checkUser()
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Routes>
        <Route path='/register' element={(<RegisterPage
          onRegister={async data => {
            try {
              const user1 = await registerUser(data);
              setUser(user1);
            } catch (error: any) {
              toaster.push((
                <Notification type='error'>{error.response.data.error}</Notification>
              ), { placement: 'topCenter' })
            }
          }}
        />)} />
        <Route path='*' element={(<LoginPage
          onLogin={async data => {
            try {
              const user1 = await loginUser(data);
              setUser(user1);
            } catch (error: any) {
              toaster.push((
                <Notification type='error'>{error.response.data.error}</Notification>
              ), { placement: 'topCenter' })
            }
          }}
        />)} />
      </Routes>
    )
  }
  if (user.type === 'patient') {
    return (
      <FlexboxGrid justify='space-between'>
        <FlexboxGrid.Item colspan={3}>
          <Navigation user={user}
            onLogout={() => {
              setUser(undefined);
              localStorage.removeItem('token')
              axios.defaults.headers.common.authorization = ''
            }}
          />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='main' colspan={21}>
          <div className='mainFistSection'>
            <div className='homeTitle'>Welcome to our website</div>
          </div>
          <Routes>
            <Route path='/schedule' element={<SchedulePage />} />
            <Route path='/history' element={<HistoryPage />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path='*' element={<HomePage />} />
          </Routes>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    )
  }
  return (
    <FlexboxGrid justify='space-between'>
      <FlexboxGrid.Item colspan={3}>
        <TechnitianNavigation user={user}
          onLogout={() => {
            setUser(undefined);
            localStorage.removeItem('token')
            axios.defaults.headers.common.authorization = ''
          }}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item className='main' colspan={21}>
        <Routes>
          <Route path='/dentists' element={<DentistsPage />} />
          <Route path='/intervention/:id' element={<InterventionShowPage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='*' element={<InterventionPage />} />
        </Routes>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default App;
