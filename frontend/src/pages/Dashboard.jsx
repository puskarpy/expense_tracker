// pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../components';

const data = [
  { name: 'Mon', income: 400, expense: 240 },
  { name: 'Tue', income: 300, expense: 139 },
  { name: 'Wed', income: 200, expense: 980 },
  { name: 'Thu', income: 278, expense: 390 },
  { name: 'Fri', income: 189, expense: 480 },
];

const pieData = [
  { name: 'Food', value: 400 },
  { name: 'Rent', value: 300 },
  { name: 'Tech', value: 300 },
  { name: 'Leisure', value: 200 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, User</h1>
          <p className="text-zinc-500">Here's what's happening with your money today.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 w-fit">
          <Plus size={20} /> Add Transaction
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Income" amount="12,450" icon={ArrowUpRight} color="text-emerald-500" />
        <StatCard title="Expenses" amount="3,120" icon={ArrowDownLeft} color="text-red-500" />
        <StatCard title="Balance" amount="9,330" icon={Wallet} color="text-zinc-100" />
        <StatCard title="Transactions" amount="48" icon={CreditCard} color="text-zinc-100" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
          <h3 className="text-lg font-semibold mb-6">Cash Flow</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#27272a'}} contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
          <h3 className="text-lg font-semibold mb-6">Categories</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

