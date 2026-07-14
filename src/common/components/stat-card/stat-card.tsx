export function StatCard({
  icon, label, value, sub, highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-card border p-4 ${highlight ? "border-red-800/50" : "border-border"}`}>
      <div className="flex items-center justify-between mb-3">
        {icon}
        <span className="text-xs text-muted-foreground font-mono">{label}</span>
      </div>
      <div className="text-2xl font-black text-foreground leading-none mb-1 font-mono" >{value}</div>
      <div className="text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}