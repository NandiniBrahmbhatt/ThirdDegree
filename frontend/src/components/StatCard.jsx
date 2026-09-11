function StatCard({ title, value, description, icon, accent }) {
  return (
    <div className="rounded-2xl border border-[#E4E9E1] bg-white p-5 shadow-[0_4px_20px_rgba(32,39,34,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#738078]">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-[#202722]">
            {value}
          </p>

          <p className="mt-1 text-xs text-[#89968E]">
            {description}
          </p>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: accent,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;