import "./tailwind.css";
import React from "react";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <Content>{children}</Content>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className="">
        {children}
      </div>
    </div>
  );
}
