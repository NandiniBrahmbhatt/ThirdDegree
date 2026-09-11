const statusStyles = {
  Healthy: "bg-[#E8EDF7] text-[ #001e61]",
  Monitor: "bg-[#FFF4DF] text-[#D68B23]",
  Warning: "bg-[#FFF1CF] text-[#A86B0F]",
  Critical: "bg-[#FBE9E7] text-[#C94B3F]",
};

function RiskBadge({ status }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        statusStyles[status] || "bg-[#F0F3F9] text-[#738078]"
      }`}
    >
      {status}
    </span>
  );
}

export default RiskBadge;