// pages/TransactionsPage.jsx
import React, {useEffect, useState} from 'react';
import { getTransactions } from '../services/transaction/dashboard';
import { Search, Filter, Edit2, Trash2 } from 'lucide-react';

export default function TransactionsPage() {

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const data = await getTransactions()
        setTransactions(data)
        
      } catch (error) {
        console.log(error.response?.data || error.message)
      }
    }

    fetchTransactions()

  }, [])


  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input placeholder="Search..." className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 w-64" />
          </div>
          <button className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-zinc-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {transactions?.map((tx) => (
              <tr key={tx.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="px-6 py-4 font-medium">{tx.category_detail.name}</td>
                <td className="px-6 py-4 text-zinc-400 text-sm">{tx.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`px-6 py-4 font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:text-emerald-500"><Edit2 size={16} /></button>
                    <button className="p-2 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}