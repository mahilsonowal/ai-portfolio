import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#788086] text-[#312f27] animate-pulse font-sans">
      {/* Header Skeleton */}
      <div className="w-full border-b border-[#312f27]/20 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-[#788086]">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[6px] bg-[#ffc500]/50 border border-[#312f27]/20" />
          <div className="space-y-2">
            <div className="w-32 h-4 rounded-[4px] bg-white/40" />
            <div className="w-48 h-3 rounded-[4px] bg-white/20" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-24 h-8 rounded-[20px] bg-white/30" />
          <div className="w-8 h-8 rounded-[20px] bg-white/30" />
        </div>
      </div>

      {/* Main Skeleton */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-12 space-y-8 flex flex-col items-center justify-center">
        <div className="space-y-2 text-center w-full max-w-md">
          <div className="w-24 h-3 rounded-[4px] bg-[#ffc500]/60 mx-auto mb-2" />
          <div className="w-3/4 h-8 rounded-[6px] bg-white/40 mx-auto" />
          <div className="w-5/6 h-4 rounded-[4px] bg-white/30 mx-auto" />
        </div>

        {/* Suggestion Card Skeletons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-[4px] bg-white/20 border-2 border-white/20 space-y-2">
              <div className="w-24 h-4 rounded-[4px] bg-white/40" />
              <div className="w-full h-3 rounded-[4px] bg-white/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Skeleton */}
      <div className="px-4 sm:px-8 pb-6 max-w-3xl w-full mx-auto">
        <div className="h-14 rounded-[16px] bg-white/20 border-2 border-white/20" />
      </div>
    </div>
  )
}
