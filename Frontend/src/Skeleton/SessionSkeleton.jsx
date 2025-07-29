import React from "react";

const SessionSkeleton = () => {
  return (
    <div className="animate-pulse p-8 space-y-10 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="h-12 bg-gray-300 rounded w-1/3"></div>

      {/* Session Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Session Description */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-gray-300 p-6 rounded-xl shadow space-y-4"
          >
            {/* Question Title */}
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>

            {/* Question Content */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-9/12"></div>
            </div>

            {/* Tags/Actions Row */}
            <div className="flex space-x-4 mt-4">
              <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Button */}
      <div className="mt-12">
        <div className="h-12 w-48 bg-gray-400 rounded-lg"></div>
      </div>
    </div>
  );
};

export default SessionSkeleton;
