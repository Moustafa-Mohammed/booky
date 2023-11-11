import React from "react";

export default function BookSpinner() {
  return (
    <div className="border border-gray-600 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
