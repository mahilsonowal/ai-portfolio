import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#ffffff] text-[#1f1f1f] animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full border-b border-[#e7e7e7] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-[10px] bg-[#f6f6f6] border border-[#e7e7e7]" />
          <div className="space-y-2">
            <div className="w-32 h-4 rounded-full bg-[#f6f6f6]" />
            <div className="w-48 h-3 rounded-full bg-[#f6f6f6]" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-24 h-8 rounded-full bg-[#f6f6f6]" />
          <div className="w-8 h-8 rounded-full bg-[#f6f6f6]" />
        </div>
      </div>

      {/* Main Chat Skeleton */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-12 space-y-8 flex flex-col items-center justify-center">
        <div className="space-y-2 text-center w-full max-w-md">
          <div className="w-24 h-3 rounded-full bg-[#f6f6f6] mx-auto mb-2" />
          <div className="w-3/4 h-7 rounded-full bg-[#f6f6f6] mx-auto" />
          <div className="w-5/6 h-4 rounded-full bg-[#f6f6f6] mx-auto" />
        </div>

        {/* Suggestion Card Skeletons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-[24px] bg-[#f6f6f6] border border-[#e7e7e7] space-y-2">
              <div className="w-24 h-4 rounded-full bg-[#e7e7e7]" />
              <div className="w-full h-3 rounded-full bg-[#e7e7e7]" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Skeleton */}
      <div className="px-4 sm:px-8 pb-6 max-w-3xl w-full mx-auto">
        <div className="h-14 rounded-[20px] bg-[#f6f6f6] border border-[#e7e7e7]" />
      </div>
    </div>
  )
}
