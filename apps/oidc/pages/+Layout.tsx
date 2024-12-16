//import "./tailwind.css";
import React from "react";

import "./account/css/style.css";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
    return <section className="font-inter antialiased bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">{children}</section>;
}
