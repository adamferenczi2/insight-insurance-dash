
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, FileText, AlertTriangle, DollarSign } from 'lucide-react';

interface MetricsCardsProps {
  data: Array<{
    date: Date;
    policies: number;
    claims: number;
    amount: number;
  }>;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({ data }) => {
  const totalPolicies = data.reduce((sum, item) => sum + item.policies, 0);
  const totalClaims = data.reduce((sum, item) => sum + item.claims, 0);
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const avgDailyClaims = data.length > 0 ? totalClaims / data.length : 0;

  const metrics = [
    {
      title: 'Összes kötvény',
      value: totalPolicies.toLocaleString(),
      icon: FileText,
      change: '+12.5%',
      positive: true,
      color: 'text-blue-400'
    },
    {
      title: 'Kárkifizetések',
      value: totalClaims.toLocaleString(),
      icon: AlertTriangle,
      change: '-3.2%',
      positive: false,
      color: 'text-red-400'
    },
    {
      title: 'Összes összeg',
      value: `${(totalAmount / 1000000).toFixed(1)}M Ft`,
      icon: DollarSign,
      change: '+8.7%',
      positive: true,
      color: 'text-green-400'
    },
    {
      title: 'Napi átlag károk',
      value: avgDailyClaims.toFixed(1),
      icon: TrendingUp,
      change: '+5.1%',
      positive: true,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">
              {metric.value}
            </div>
            <p className={`text-xs ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change} az előző időszakhoz képest
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
