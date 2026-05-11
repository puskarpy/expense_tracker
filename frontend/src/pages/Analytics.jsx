import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, Target, Zap } from 'lucide-react';

import { InsightCard } from '../components';

const trendData = [
  { month: 'Jan', amount: 2400 },
  { month: 'Feb', amount: 1398 },
  { month: 'Mar', amount: 9800 },
  { month: 'Apr', amount: 3908 },
  { month: 'May', amount: 4800 },
  { month: 'Jun', amount: 3800 },
];

const categoryData = [
  { name: 'Fixed Costs', value: 45, color: '#10b981' },
  { name: 'Leisure', value: 25, color: '#3b82f6' },
  { name: 'Investment', value: 20, color: '#f59e0b' },
  { name: 'Unexpected', value: 10, color: '#ef4444' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-bold">Financial Analytics</h1>
        <p className="text-zinc-500">Deep dive into your spending patterns and trends.</p>
      </header>

      {/* Summary Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard 
          title="Highest Spending" 
          value="Housing" 
          subtitle="32% of total budget" 
          icon={Target} 
        />
        <InsightCard 
          title="Avg. Monthly" 
          value="$4,250" 
          subtitle="+12% from last year" 
          icon={TrendingUp} 
        />
        <InsightCard 
          title="Savings Rate" 
          value="24%" 
          subtitle="Top 10% of users" 
          icon={Zap} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-4xl">
          <h3 className="text-lg font-semibold mb-8">Expense Velocity</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
                <Area type="monotone" dataKey="amount" stroke="#10b981" fillOpacity={1} fill="url(#colorAmt)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-4xl">
          <h3 className="text-lg font-semibold mb-8">Allocation Breakdown</h3>
          <div className="h-72 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryData} 
                  innerRadius={80} 
                  outerRadius={100} 
                  paddingAngle={8} 
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 pr-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}} />
                  <span className="text-xs text-zinc-400 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

