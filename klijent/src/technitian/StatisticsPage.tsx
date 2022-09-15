import React from 'react'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, BarChart, Bar } from 'recharts'
export default function StatisticsPage() {
  return (
    <div className='container'>
      <div className='header'>
        Income report
      </div>
      <ResponsiveContainer width="100%" aspect={16 / 9}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={[{
            date: '4.2022',
            income: 24
          }]}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey='income' stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className='header'>
        Services usage
      </div>
      <ResponsiveContainer width="100%" aspect={16 / 9}>
        <BarChart
          data={[]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey='total' stroke="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
