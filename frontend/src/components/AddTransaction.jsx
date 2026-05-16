import React, { useEffect, useState } from 'react';
import {
  X,
  DollarSign,
  Tag,
  Calendar as CalendarIcon,
  FileText,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { fetchCategories } from '../services/transaction/dashboard';

export default function AddTransactionForm({ onClose, onSubmit }) {

  const [transactionData, setTransactionData] = useState({
    type: "income",
    amount: "",
    category: "",
    description: ""
  })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategory = async() => {
      const res = await fetchCategories()
      setCategories(res.data)
    }
    fetchCategory()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(transactionData)
    await onSubmit(transactionData)
  }

  return (
    <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
      {/* Header */}
      <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <div>
          <h2 className="text-xl font-bold text-white">New Transaction</h2>
          <p className="text-zinc-500 text-sm">Record your income or expenses</p>
        </div>
        {onClose && (
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form className="p-8 space-y-6" onSubmit={handleSubmit}>

        {/* Toggle Switch for Type */}
        <div className="flex p-1 bg-zinc-950 border border-zinc-800 rounded-2xl">
          <button
            type="button"
            onClick={() => setTransactionData({ ...transactionData, type: "expense" })}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${transactionData.type === 'expense'
                ? 'bg-red-500/10 text-red-500 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <ArrowDownLeft size={18} />
            Expense
          </button>
          <button
            type="button"
            onClick={() => setTransactionData({ ...transactionData, type: "income" })}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${transactionData.type === 'income'
                ? 'bg-emerald-500/10 text-emerald-500 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
              }`}
          >
            <ArrowUpRight size={18} />
            Income
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Amount</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
              <DollarSign size={20} />
            </div>
            <input
              type="number"
              value={transactionData.amount}
              onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })}
              step="0.01"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-2xl font-semibold text-white placeholder:text-zinc-800"
              placeholder="0.00"
              min={0}
            />
          </div>
        </div>
        {/* Category */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Category</label>
          <div className="relative group">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500" size={18} />
            <select
              value={transactionData.category}
              onChange={(e) => setTransactionData({ ...transactionData, category: Number(e.target.value) })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white appearance-none cursor-pointer">
              {
                categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              }
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Description</label>
          <div className="relative group">
            <FileText className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-emerald-500" size={18} />
            <textarea
              value={transactionData.description}
              onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
              rows="3"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700 resize-none"
              placeholder="What was this for?"
            ></textarea>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="flex-1 py-4 border border-zinc-800 rounded-2xl font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-2 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98]"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}