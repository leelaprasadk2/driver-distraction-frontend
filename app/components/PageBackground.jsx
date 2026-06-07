export default function PageBackground({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-black">

      {/* Blue Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 blur-[140px] rounded-full" />

      {/* Purple Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}