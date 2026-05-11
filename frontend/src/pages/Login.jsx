// pages/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4">
            <Wallet className="text-black" size={32} />
          </div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-zinc-500">Sign in to manage your finances</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10">
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-zinc-500 text-sm">
          Don't have an account? <Link to="/register" className="text-emerald-500 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}