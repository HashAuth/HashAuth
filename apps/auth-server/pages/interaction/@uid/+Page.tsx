import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { render } from 'vike/abort'

import  hashNamesLogo from '../../../assets/hashnames-logo.webp';

export default function Page() {
  const interaction = useData<Data>();

  function handleDeny(event: any) {
    event.preventDefault();
    window.location.href = `/interaction/${interaction?.uid}/abort`;
  }

  if (interaction?.prompt == "login") {
    return (<div>   
      <form autoComplete="false" action={"/interaction/" + interaction?.uid + "/login"} method="post">
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center px-5 py-2.5 rounded-lg font-bold py-2 px-4 rounded">
   <span className="text-sm font-light text-center">Authenticate with</span>
    <div className=" pt-1 items-center text-center justify-center" />
<div className="justify-center flex items-center text-2xl text-center font-semibold text-center">
<img className="w-8 h-8 mr-2" src="https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp" alt="logo" />
HashPack   
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
          <span className="font-medium">{interaction?.client?.clientName}</span> would like access to your:
        </div>
        <ul>
          <li><span className="font-medium">Wallet address</span> (0.0.1337)</li>
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
       <form autoComplete="false" action={"/interaction/" + interaction?.uid + "/consent"} method="post">
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
