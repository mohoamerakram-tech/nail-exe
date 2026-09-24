export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="animate-spin text-4xl">💅</div>
      <div className="animate-pulse font-pixel-title text-[#db2777] text-xl">LOADING DASHBOARD...</div>
    </div>
  );
}
