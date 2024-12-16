import React, { useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { usePageContext } from "vike-react/usePageContext";
import { Sidebar } from "flowbite-react";
import { BiSolidUserDetail } from "react-icons/bi";

import { MdDashboard } from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";

import Dashboard from "./tabs/Dashboard";

enum CurrentTabType {
    Dashboard = 0,
    Identity = 1,
}

export default function Page({ children }: { children: React.ReactNode }) {
    const pageContext = usePageContext();
    const [currentTab, setCurrentTab] = useState<CurrentTabType>(CurrentTabType.Dashboard);

    let tab;
    switch (currentTab) {
        case CurrentTabType.Dashboard:
            tab = <Dashboard></Dashboard>;
            break;
    }

    return (
        <section className="dark:bg-gray-900">
            <Navbar fluid>
                <Navbar.Brand href="/">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-0 pb-0">
                        HashAuth <span className="text-xs text-red-700">{pageContext.isTestnet ? "TESTNET" : ""}</span>
                    </h1>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User avatar"
                                rounded
                                size="sm"
                                theme={{
                                    root: {
                                        base: "flex items-center justify-center rounded space-x-2",
                                    },
                                }}
                            >
                                <div className="space-y-1 font-light dark:text-white">
                                    <div>{pageContext.accountId}</div>
                                </div>
                            </Avatar>
                        }
                    >
                        <Dropdown.Header>
                            {pageContext.accountNickname ? <span className="block text-sm">{pageContext.accountNickname}</span> : ""}

                            <span className="block truncate text-sm font-medium">{pageContext.accountId}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Switch Account</Dropdown.Item>
                        <Dropdown.Item className="font-medium">Sign out</Dropdown.Item>
                    </Dropdown>
                </div>
            </Navbar>
            <div className="flex">
                <div className="flex">
                    <Sidebar
                        aria-label="Sidebar with content separator example"
                        theme={{
                            root: {
                                inner: "h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden rounded-none px-3 py-4 dark:bg-gray-900",
                            },
                        }}
                    >
                        <Sidebar.Items className="rounded-none">
                            <Sidebar.ItemGroup className="rounded-none">
                                <Sidebar.Item
                                    active={currentTab == CurrentTabType.Dashboard}
                                    icon={MdDashboard}
                                    href="#"
                                    onClick={() => setCurrentTab(CurrentTabType.Dashboard)}
                                >
                                    Dashboard
                                </Sidebar.Item>
                                <Sidebar.Item
                                    active={currentTab == CurrentTabType.Identity}
                                    icon={BiSolidUserDetail}
                                    href="#"
                                    onClick={() => setCurrentTab(CurrentTabType.Identity)}
                                >
                                    Identity
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item href="#" icon={HiViewBoards}>
                                    Docs
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </div>

                {tab}
            </div>
        </section>
    );
}
