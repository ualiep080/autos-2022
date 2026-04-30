'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AnalyticsChart({ data7Days, data30Days, data12Months }) {
  const [period, setPeriod] = useState('7'); // '7', '30', '12'

  let data = data7Days;
  if (period === '30') data = data30Days;
  if (period === '12') data = data12Months;

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      marginBottom: '2.5rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)', margin: 0 }}>
          📈 Actividad de la web
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#f1f5f9', padding: '0.25rem', borderRadius: '0.5rem' }}>
          <button
            onClick={() => setPeriod('7')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              backgroundColor: period === '7' ? 'white' : 'transparent',
              color: period === '7' ? '#0f172a' : '#64748b',
              boxShadow: period === '7' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            7 días
          </button>
          <button
            onClick={() => setPeriod('30')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              backgroundColor: period === '30' ? 'white' : 'transparent',
              color: period === '30' ? '#0f172a' : '#64748b',
              boxShadow: period === '30' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            30 días
          </button>
          <button
            onClick={() => setPeriod('12')}
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              backgroundColor: period === '12' ? 'white' : 'transparent',
              color: period === '12' ? '#0f172a' : '#64748b',
              boxShadow: period === '12' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            12 meses
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              allowDecimals={false}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontWeight: 600 }}
              labelStyle={{ color: '#6b7280', marginBottom: '0.25rem' }}
            />
            <Legend wrapperStyle={{ paddingTop: '1rem', fontSize: '14px' }} iconType="circle" />
            
            <Line 
              name="Visitas"
              type="monotone" 
              dataKey="visits" 
              stroke="#F5C518" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: 'white' }} 
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
            <Line 
              name="Clics"
              type="monotone" 
              dataKey="clicks" 
              stroke="#16a34a" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2, fill: 'white' }} 
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
