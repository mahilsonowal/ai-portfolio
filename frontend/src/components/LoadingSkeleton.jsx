import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-800" />
          <div className="space-y-2">
            <div className="w-32 h-4 rounded bg-slate-800" />
            <div className="w-48 h-3 rounded bg-slate-800/60" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-20 h-8 rounded-xl bg-slate-800" />
          <div className="w-8 h-8 rounded-xl bg-slate-800" />
        </div>
      </div>

      {/* Main Chat Skeleton */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-12 space-y-8 flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-800 mb-2" />
        <div className="space-y-2 text-center w-full max-w-md">
          <div className="w-3/4 h-6 rounded-lg bg-slate-800 mx-auto" />
          <div className="w-5/6 h-4 rounded-lg bg-slate-800/60 mx-auto" />
        </div>

        {/* Suggestion Card Skeletons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="w-24 h-4 rounded bg-slate-800" />
              <div className="w-full h-3 rounded bg-slate-800/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Input Skeleton */}
      <div className="px-4 sm:px-8 pb-6 max-w-3xl w-full mx-auto">
        <div className="h-14 rounded-2xl bg-slate-900 border border-slate-800" />
      </div>
    </div>
  )
}
