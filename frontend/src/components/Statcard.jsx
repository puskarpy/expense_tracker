export default function StatCard({ title, amount, icon: Icon, color }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl hover:border-emerald-500/50 transition-colors">
      <div className={`p-3 rounded-xl bg-zinc-800 w-fit mb-4 ${color}`}>
        <Icon size={24} />
      </div>
      <p className="text-zinc-500 text-sm font-medium">{title}</p>
      <h2 className="text-2xl font-bold mt-1">${amount}</h2>
    </div>
  );
}