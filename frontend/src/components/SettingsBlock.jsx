export default function SettingsBlock({ icon: Icon, title, description }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl flex items-center gap-4 cursor-pointer hover:border-zinc-700 transition-colors group">
      <div className="p-3 bg-zinc-800 rounded-2xl text-zinc-400 group-hover:text-emerald-500 transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-zinc-100">{title}</h4>
        <p className="text-zinc-500 text-xs">{description}</p>
      </div>
    </div>
  );
}