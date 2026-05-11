export default function InsightCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-zinc-800 rounded-2xl text-emerald-500">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className="text-xl font-bold text-white">{value}</h3>
          <p className="text-zinc-600 text-xs mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}