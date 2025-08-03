import React, { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";
import AlphaAlert from "../../components/AlphaAlert";

function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pageContext = usePageContext();

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto">
                        <AlphaAlert></AlphaAlert>
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                                    {pageContext.urlPathname == "/account" && "Dashboard"}
                                    {pageContext.urlPathname == "/account/identity" && "Identity"}
                                </h1>
                            </div>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;
