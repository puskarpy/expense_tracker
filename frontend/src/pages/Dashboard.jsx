// pages/DashboardPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/user/AuthProvider';
import { DashboardContext } from '../context/transaction/DashboardProvider';
import { TransactionContext } from '../context/transaction/TransactionProvider';
import { Plus, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../components';
import { AddTransactionForm } from '../components';
import { addTransaction, getTransactions } from '../services/transaction/dashboard';


const COLORS = [
  '#10b981',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
];
export default function DashboardPage() {

  const { user } = useContext(AuthContext);
  const { dashboard } = useContext(DashboardContext);
  const { transaction, setTransaction, fetchTransactions } = useContext(TransactionContext);
  const [showAddTransactionForm, setShowTransactionForm] = useState(false);

  const handleAddTransaction = async(formData) => {
    try {
      await addTransaction(formData)
      await fetchTransactions()
      setShowTransactionForm(false)
    } catch (error) {
      console.log(error.response?.data|| error.message)
    }
  }

  function getAmtByCategory(name) {
    return transaction
    ?.filter(t => t?.category_detail?.name === name)
    ?.reduce((total,t) => total + Number(t?.amount), 0) || 0
    
  }

  const pieData = [
    { name: 'Other', value: getAmtByCategory("Other") },
    { name: 'Savings', value: getAmtByCategory("Savings") },
    { name: 'Entertainment', value: getAmtByCategory("Entertainment") },
    { name: 'Shopping', value: getAmtByCategory("Shopping") },
    { name: 'Health', value: getAmtByCategory("Health") },
    { name: 'Utilities', value: getAmtByCategory("Utilities") },
    { name: 'Transport', value: getAmtByCategory("Other") },
    { name: 'Rent', value: getAmtByCategory("Transport") },
    { name: 'Food', value: getAmtByCategory("Food") },
  ];

  const chartData = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
    {
      name: day,
      income: 0,
      expense: 0
    }
  ))

  transaction?.forEach(t => {
    const date = new Date(t.date)
    const dayIndex = date.getDay()

    if(t.type === "income"){
      chartData[dayIndex].income += Number(t.amount)
    } else{
      chartData[dayIndex].expense += Number(t.amount)
    }
  })

  return (
    <div className="relative space-y-10 animate-in fade-in duration-700">

      {/* Modal */}
      {showAddTransactionForm && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowTransactionForm(false)}
        >
          <div
            className="w-full max-w-lg animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <AddTransactionForm onClose={setShowTransactionForm} onSubmit={handleAddTransaction} />
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user.first_name + " " + user.last_name}
          </h1>
          <p className="text-zinc-500">
            Here's what's happening with your money today.
          </p>
        </div>

        <button
          onClick={() => setShowTransactionForm(prev => !prev)}
          className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 w-fit"
        >
          <Plus size={20} /> Add Transaction
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Income" amount={dashboard?.total_income || 0} icon={ArrowUpRight} color="text-emerald-500" />
        <StatCard title="Expenses" amount={dashboard?.total_expense || 0} icon={ArrowDownLeft} color="text-red-500" />
        <StatCard title="Balance" amount={dashboard?.remaining_balance || 0} icon={Wallet} color="text-zinc-100" />
        <StatCard title="Transactions" amount={dashboard?.transaction_count || 0} icon={CreditCard} color="text-zinc-100" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
          <h3 className="text-lg font-semibold mb-6">Cash Flow</h3>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  stroke="#52525b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                />

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
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}