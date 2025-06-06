
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';

interface TransactionChartProps {
  data: Array<{
    date: Date;
    policies: number;
    claims: number;
    amount: number;
  }>;
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    date: format(item.date, 'MM/dd'),
    policies: item.policies,
    claims: item.claims,
    amount: item.amount / 1000 // Convert to thousands
  }));

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Tranzakciók időbeli alakulása</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Line 
                type="monotone" 
                dataKey="policies" 
                stroke="#60A5FA" 
                strokeWidth={3}
                name="Kötvények"
                dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="claims" 
                stroke="#F87171" 
                strokeWidth={3}
                name="Károk"
                dot={{ fill: '#F87171', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
