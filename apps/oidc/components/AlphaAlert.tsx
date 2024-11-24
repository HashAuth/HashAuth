import React from "react";

export default function Alert() {
  return (
    <div
      className="p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50"
      role="alert"
    >
      HashAuth is currently in <span className="font-medium">ALPHA</span>.
    </div>
  );
}
