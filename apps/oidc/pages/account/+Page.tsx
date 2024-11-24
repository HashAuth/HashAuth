import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { usePageContext } from "vike-react/usePageContext";
import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

import AlphaAlert from "../../components/AlphaAlert";

export default function Page({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();

  return (
    <section className="dark:bg-gray-800">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-0 pb-0">
            HashAuth{" "}
            <span className="text-xs text-red-700">
              {pageContext.isTestnet ? "TESTNET" : ""}
            </span>
          </h1>
        </Navbar.Brand>

        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User avatar" rounded>
                <div className="space-y-1 font-light dark:text-white">
                  <div>{pageContext.accountId}</div>
                </div>
              </Avatar>
            }
          >
            <Dropdown.Header>
              {pageContext.accountNickname ? (
                <span className="block text-sm">
                  {pageContext.accountNickname}
                </span>
              ) : (
                ""
              )}

              <span className="block truncate text-sm font-medium">
                {pageContext.accountId}
              </span>
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
                inner:
                  "h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden rounded-none px-3 py-4 dark:bg-gray-800",
              },
            }}
          >
            <Sidebar.Items className="rounded-none">
              <Sidebar.ItemGroup className="rounded-none">
                <Sidebar.Item active={true} href="#" icon={HiChartPie}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiViewBoards}>
                  Kanban
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiInbox}>
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Sidebar.Item href="#" icon={HiChartPie}>
                  Upgrade to Pro
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiViewBoards}>
                  Documentation
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={BiBuoy}>
                  Help
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        <div className="flex flex-1 px-2 pt-4">
          <div className="grid gap-y-0 grid-cols-3 w-full content-start">
            <div className="col-span-3 mx-10">
              <AlphaAlert></AlphaAlert>
            </div>

            <div className="col-span-1 bg-red-200">hello</div>
            <div className="col-span-1 bg-red-200">hello2</div>
            <div className="col-span-1 bg-red-200">hello3</div>
            <div className="col-span-1 bg-red-200">hello4</div>
          </div>
        </div>
      </div>
    </section>
  );
}
