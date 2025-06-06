
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: Array<{
    date: Date;
    policies: number;
    claims: number;
    amount: number;
  }>;
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const totalPolicies = data.reduce((sum, item) => sum + item.policies, 0);
  const totalClaims = data.reduce((sum, item) => sum + item.claims, 0);

  const chartData = [
    { name: 'Kötvények', value: totalPolicies, color: '#60A5FA' },
    { name: 'Károk', value: totalClaims, color: '#F87171' }
  ];

  const COLORS = ['#60A5FA', '#F87171'];

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Megoszlás</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-medium">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
