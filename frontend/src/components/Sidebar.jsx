import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/user/AuthProvider';
import { LayoutDashboard, Receipt, BarChart3, User, LogOut, Wallet } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/transactions', icon: Receipt, label: 'Transactions' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  const {logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = async() => {
    try {
      const token = localStorage.getItem("refresh")
      await logoutUser({"refresh" : token})
      navigate("/login")
    } catch (error) {
      console.log(error.response?.message || error.message)
    }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 flex-col p-6 hidden lg:flex">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Wallet className="text-black" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Expenza</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? 'bg-emerald-500/10 text-emerald-500' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors mt-auto border-t border-zinc-800 pt-6">
        <LogOut size={20} />
        <span className="font-medium text-sm">Logout</span>
      </button>
    </aside>
  );
}