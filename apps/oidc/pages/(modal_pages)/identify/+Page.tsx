import React, { useState } from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import SumsubWebSdk from "@sumsub/websdk-react";

import type { Data } from "./+data.js";

interface IdentifyProps {
    isInteraction?: boolean;
}

export default function Identify(props: IdentifyProps) {
    const data = useData<Data>();
    const pageContext = usePageContext();

    const [sumsubAccessToken, setSumsubAccessToken] = useState<string>("");
    const [showSumsub, setShowSumsub] = useState<boolean>(false);

    const handleSumsubExpiration = () => {
        setShowSumsub(false);
        setSumsubAccessToken("");
    };

    const handleSumsubMessage = (type: string, payload: any) => {
        console.log(type);
        console.log(payload);

        if (type == "idCheck.onApplicantStatusChanged") {
            if (payload.reviewStatus == "completed" && payload.reviewResult.reviewAnswer == "GREEN") {
                console.log("ID check done!");
                if (props.isInteraction) {
                    window.location.href = `/interaction/${data?.interaction?.uid}/complete-identify`;
                }
            }
        }
    };

    const handleIdentifyWithSumsub = async () => {
        try {
            let response = await fetch("/api/sumsub/accessToken", { credentials: "include" });
            let data = await response.json();

            if (!response.ok) {
                alert(`${data.error}\n\nPlease refresh and try again!`);
                return;
            }

            setSumsubAccessToken(data.accessToken);
            setShowSumsub(true);
        } catch (error) {
            alert(`An error occured:\n\n${error}\n\nPlease refresh and try again!`);
        }
    };

    return (
        <div className="container prose dark:prose-invert">
            {showSumsub ? (
                <div>
                    <div
                        className="p-4 mb-4 text-sm text-center text-xs font-light text-blue-800 rounded-lg bg-blue-200 dark:bg-yellow-50"
                        role="alert"
                    >
                        <span className="font-bold">Hackathon judges:</span> For your privacy, verification has been{" "}
                        <span className="font-bold">disabled</span>. Simply capture/upload a photo of anything. In production, advanced
                        liveness and ID checks are performed. <br />
                        <br />
                        Watch our demo video to see liveness checks in action!
                    </div>
                    <div style={{ maxHeight: "800px", overflowY: "auto", width: "100%" }}>
                        <SumsubWebSdk
                            accessToken={sumsubAccessToken}
                            onMessage={handleSumsubMessage}
                            expirationHandler={handleSumsubExpiration}
                        ></SumsubWebSdk>
                    </div>
                </div>
            ) : (
                <div>
                    {" "}
                    <p>
                        <strong>HashAuth</strong> utilizes <strong>sumsub</strong>, an industry-leading identity verification provider, to
                        securely identify you.
                    </p>
                    <p className="mb-0 pb-0">
                        To learn more about sumsub, click{" "}
                        <a href="https://sumsub.com" target="_blank">
                            here.
                        </a>
                    </p>
                    <hr className="mb-5 mt-5" />
                    <div className="text-center mt-0 pt-0">
                        <div
                            className="p-4 mb-4 text-sm text-center text-xs font-light text-blue-800 rounded-lg bg-blue-200 dark:bg-yellow-50"
                            role="alert"
                        >
                            <span className="font-bold">Hackathon judges:</span> For your privacy, verification has been{" "}
                            <span className="font-bold">disabled</span>. Simply capture/upload a photo of anything. In production, advanced
                            liveness and ID checks are performed.
                            <br />
                            <br />
                            Watch our demo video to see liveness checks in action!
                        </div>
                        <small className="font-extralight">
                            You have <strong>5</strong> identification credits remaining
                        </small>
                        <button
                            onClick={handleIdentifyWithSumsub}
                            className="mt-3 w-10/12 bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-4 rounded"
                        >
                            <span className="text-xs font-light text-center">Identify with</span>

                            <div className="h-8 justify-center flex items-center text-xl text-center font-semibold text-center">
                                <img className="w-9" src="https://i.imgur.com/Evi3pbF.png" alt="logo" />
                                <strong>sumsub</strong>
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
