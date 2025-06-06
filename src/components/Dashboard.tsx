
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, TrendingUp, FileText, AlertTriangle, DollarSign } from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { cn } from '@/lib/utils';
import { MetricsCards } from './MetricsCards';
import { TransactionChart } from './TransactionChart';
import { PieChart } from './PieChart';

// Demo adatok
const generateDemoData = () => {
  const data = [];
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date();
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      policies: Math.floor(Math.random() * 20) + 5,
      claims: Math.floor(Math.random() * 15) + 2,
      amount: Math.floor(Math.random() * 50000) + 10000
    });
  }
  
  return data;
};

const Dashboard = () => {
  const [dateFrom, setDateFrom] = useState<Date>(subDays(new Date(), 30));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [timeFilter, setTimeFilter] = useState('30days');
  
  const demoData = useMemo(() => generateDemoData(), []);
  
  const filteredData = useMemo(() => {
    return demoData.filter(item => 
      item.date >= dateFrom && item.date <= dateTo
    );
  }, [demoData, dateFrom, dateTo]);

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    const now = new Date();
    
    switch (value) {
      case '7days':
        setDateFrom(subDays(now, 7));
        setDateTo(now);
        break;
      case '30days':
        setDateFrom(subDays(now, 30));
        setDateTo(now);
        break;
      case 'month':
        setDateFrom(startOfMonth(now));
        setDateTo(endOfMonth(now));
        break;
      case 'year':
        setDateFrom(startOfYear(now));
        setDateTo(endOfYear(now));
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Biztosítási Dashboard</h1>
            <p className="text-slate-300">Kötvények és kárkifizetések áttekintése</p>
          </div>
          
          {/* Szűrők */}
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7days">Utolsó 7 nap</SelectItem>
                <SelectItem value="30days">Utolsó 30 nap</SelectItem>
                <SelectItem value="month">Ez a hónap</SelectItem>
                <SelectItem value="year">Ez az év</SelectItem>
                <SelectItem value="custom">Egyedi</SelectItem>
              </SelectContent>
            </Select>
            
            {timeFilter === 'custom' && (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(dateFrom, "yyyy.MM.dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={(date) => date && setDateFrom(date)}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <span className="text-slate-400">-</span>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline"
                      className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(dateTo, "yyyy.MM.dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={(date) => date && setDateTo(date)}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>

        {/* Metrikák */}
        <MetricsCards data={filteredData} />

        {/* Grafikonok */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TransactionChart data={filteredData} />
          </div>
          <div>
            <PieChart data={filteredData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
