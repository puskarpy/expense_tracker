import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, User, Mail, Lock } from 'lucide-react';
import { register } from '../services/auth/auth';
import { AuthContext } from '../context/user/AuthProvider';

export default function RegisterPage() {
  const {loginUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      setLoading(true)
      await register(formData)

      await loginUser({username: formData.username, password: formData.password})
      navigate("/dashboard")
    } catch (error) {

      console.log(error.response?.message || error.message)
      
    } finally{
      setLoading(false)
    }
  }

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

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div className='flex gap-4'>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">First Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                  placeholder="John"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Last Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  type="text"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                type="text" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                placeholder="john69"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                type="email" 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Password Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500 transition-all text-white placeholder:text-zinc-700"
                  placeholder="••••••••"
                />
              </div>
          </div>

          {/* Submit */}
          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] mt-4">
            {loading ? "Creating account..." :"Create Account"}
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