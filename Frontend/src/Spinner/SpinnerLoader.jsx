import React from "react";

function SpinnerLoader({ size = "md", color = "text-white" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${color}`}
      ></div>
    </div>
  );
}

export default SpinnerLoader;