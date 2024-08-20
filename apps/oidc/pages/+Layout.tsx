import "./tailwind.css";
import React from "react";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-gray-50 dark:bg-gray-900">{children}</section>;
}
