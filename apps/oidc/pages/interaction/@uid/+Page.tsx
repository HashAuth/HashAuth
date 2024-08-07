import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const interaction = useData<Data>();
  const pageContext = usePageContext();

  async function handleAuthWithMetaMask(event: any) {
    // event.preventDefault();
  }

  async function handleAuthWithHashPack(event: any) {
   // event.preventDefault();
  }

  function handleDeny(event: any) {
    event.preventDefault();
    window.location.href = `/interaction/${interaction?.uid}/abort`;
  }

  if (interaction?.prompt == "login") {
    return (<div className="text-center">   
      <form autoComplete="false" action={"/interaction/" + interaction?.uid + "/login"} method="post">
      <button type="submit" onClick={handleAuthWithHashPack} className="w-10/12 bg-blue-500 hover:bg-blue-700 text-white text-center rounded-lg font-bold py-1 px-4 rounded">
   <span className="text-xs font-light text-center">Authenticate with</span>
    <div className="items-center text-center justify-center" />
<div className="justify-center flex items-center text-xl text-center font-semibold text-center">
<img className="w-5 h-5 mr-1" src="https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp" alt="logo" />
HashPack   
</div>
</button>
<button type="submit" onClick={handleAuthWithMetaMask} className="w-10/12 bg-blue-500 hover:bg-blue-700 text-white text-center mt-1 rounded-lg font-bold py-1 px-4 rounded">
   <span className="text-xs font-light text-center">Authenticate with</span>
    <div className="items-center text-center justify-center" />
<div className="justify-center flex items-center text-xl text-center font-semibold text-center">
<img className="w-7 h-7" src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg" alt="logo" />
 MetaMask
</div>
</button>
      </form>
    
</div>);
  } else if (interaction?.prompt == "consent") {
   // return (<p><h1>{interaction?.session}</h1><h1>{interaction?.dbg.params}</h1></p>);
   return(
    
    <div className="container prose dark:prose-invert">
      <div className="mb-5">
        <div className="text-center">
          {interaction?.client?.logoUri ? <img className="mr-auto ml-auto mt-0 pt-0 mb-2 pb-0" src={interaction?.client?.logoUri} width="100" /> : ""}
          <span className="font-medium">{interaction?.client?.clientName}</span> would like to access your:
        </div>
        <ul>
          <li><span className="font-medium">Wallet address</span> ({pageContext.accountId})</li>
          <li><span className="font-medium">Display name</span></li>
          <li className="border rounded-md border-2 border-red-500 "><span className="font-medium">KYC profile</span>, which includes your:
            <ul className="font-medium">
              <li>Full name</li>
              <li>Date of birth</li>
              <li>Residential address</li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
       <form autoComplete="false" action={"/interaction/" + interaction?.uid + "/confirm"} method="post">
      <button type="submit" className="bg-green-700 hover:bg-green-800 mr-1 text-white text-center px-10 py-2.5 rounded-lg font-bold  rounded">
   Approve
</button>
<button onClick={handleDeny} className="bg-neutral-600 hover:bg-neutral-700 text-white text-center px-5 py-2.5 rounded-lg font-bold  rounded">
   Deny
</button>
      </form>
      </div>
    </div>
   );
  } 
  return (
    <h1>Unhandled interaction prompt</h1>
   
  );
}
