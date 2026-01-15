export function Equalizer({ className = "", barCount = 7 }: { className?: string; barCount?: number }) {
  return (
    <div className={`flex items-end justify-center gap-1 h-12 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div key={i} className="equalizer-bar w-1.5 bg-spotify-green rounded-full" style={{ height: "100%" }} />
      ))}
    </div>
  )
}
