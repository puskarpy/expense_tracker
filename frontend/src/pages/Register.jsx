import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, User, Mail, Lock } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 selection:bg-emerald-500/30">
      <div className="w-full max-w-lg bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
            <Wallet className="text-black" size={30} />
          </div>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-zinc-500 mt-2">Start managing your expenses like a pro.</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="text" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                placeholder="pushkar_dev"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                type="email" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          {/* Password Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] mt-4">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-8 text-zinc-500 text-sm">
          Already have an account? <Link to="/login" className="text-emerald-500 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}