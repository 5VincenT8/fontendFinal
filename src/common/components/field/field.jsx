export function Field({label, children}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground font-mono">
        {label}
      </label>
      {children}
    </div>
  );
}