import React, { useState } from "react";
import { usePageContext } from "vike-react/usePageContext";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";

import AlphaAlert from "../../../components/AlphaAlert";

export default function Home() {
    const pageContext = usePageContext();

    return (
        <div className="flex flex-1 px-2 pt-4">
            <div className="grid gap-y-0 grid-cols-4 w-full content-start">
                <div className="col-span-4 mx-10">
                    <AlphaAlert></AlphaAlert>
                </div>
                <div className="col-span-4">
                    <Avatar size="lg" rounded></Avatar>
                </div>
                <div className="mt-2 mb-2 col-span-4 justify-center place-items-center text-center justify-content-center content-center">
                    <span className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Welcome, {pageContext.accountId}
                    </span>
                </div>
                <div className="col-span-2 justify-center">
                    <Card>Test!</Card>
                </div>
                <div className="col-span-2 justify-center">
                    <Card>Test!</Card>
                </div>
            </div>
        </div>
    );
}
