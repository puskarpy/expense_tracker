import React from 'react';
import { Camera, Shield, Mail, Bell, Key } from 'lucide-react';
import { SettingsBlock } from '../components';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-zinc-500">Manage your profile information and preferences.</p>
      </header>

      {/* Profile Header Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 bg-zinc-800 rounded-full border-4 border-zinc-900 overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pushkar" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full text-black hover:bg-emerald-400 transition-transform hover:scale-110">
            <Camera size={18} />
          </button>
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold">Pushkar</h2>
          <p className="text-zinc-500 font-medium">pushkar@example.com</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">PRO PLAN</span>
            <span className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs font-bold rounded-full">EST. 2024</span>
          </div>
        </div>
        <button className="px-6 py-2 border border-zinc-700 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsBlock icon={Mail} title="Email Notifications" description="Manage how we reach you." />
        <SettingsBlock icon={Shield} title="Privacy & Security" description="Control your data visibility." />
        <SettingsBlock icon={Key} title="Password" description="Last changed 3 months ago." />
        <SettingsBlock icon={Bell} title="System Alerts" description="Configure app push notifications." />
      </div>

      <div className="pt-6 border-t border-zinc-800 flex justify-end gap-4">
        <button className="px-6 py-3 text-zinc-500 font-semibold hover:text-zinc-300">Deactivate Account</button>
        <button className="px-8 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-500/20 transition-all">
          Logout
        </button>
      </div>
    </div>
  );
}
