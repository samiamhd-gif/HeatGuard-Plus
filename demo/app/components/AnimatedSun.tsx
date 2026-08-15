export function AnimatedSun() {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      <div className="relative flex items-center justify-center group cursor-pointer">
        <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-md animate-sun-glow scale-125 pointer-events-none" />

        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="w-14 h-14 animate-sun-spin transition-transform duration-500 group-hover:scale-110 relative z-10 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]"
        >
          <defs>
            <linearGradient id="sunRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
            (angle, idx) => (
              <line
                key={angle}
                x1="50"
                y1="12"
                x2="50"
                y2="4"
                stroke="url(#sunRayGrad)"
                strokeWidth={idx % 2 === 0 ? "4" : "2.5"}
                strokeLinecap="round"
                transform={`rotate(${angle} 50 50)`}
              />
            ),
          )}
        </svg>

        <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.7)] border-2 border-white/90 flex items-center justify-center z-20 group-hover:scale-105 transition-transform duration-300">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-6">
            <circle cx="9" cy="10" r="1.5" fill="#ffffff" />
            <circle cx="15" cy="10" r="1.5" fill="#ffffff" />
            <path
              d="M7.5 14.5 Q12 18.5 16.5 14.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
