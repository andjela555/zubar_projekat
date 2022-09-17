import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, BarChart, Bar, Tooltip } from 'recharts'
import { getStatistics, Stats } from '../service/statisticsService';
export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Stats | undefined>(undefined);

  useEffect(() => {
    getStatistics().then(setStatistics);
  }, [])
  if (!statistics) {
    return null;
  }

  return (
    <div className='container'>
      <div className='header'>
        Intervention count
      </div>
      <ResponsiveContainer width="100%" aspect={16 / 9}>
        <LineChart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          data={statistics.timeStatistics}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Line type="monotone" dataKey='total' stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className='header'>
        Services usage
      </div>
      <ResponsiveContainer width="100%" aspect={16 / 9}>
        <BarChart
          data={statistics.serviceStatistics}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax']} />
          <Tooltip />
          <Bar dataKey='total' fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
