import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import { render } from 'vike/abort'

export default function Page() {
  const interaction = useData<Data>();

  async function handleClick() {
    await fetch("/oidc/session/end/confirm", {
      method: "POST"
    });
  }

  if (interaction?.prompt == "login") {
    return (<div>   
      <form autoComplete="false" action={"/interaction/" + interaction?.uid + "/login"} method="post">
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center px-5 py-2.5 rounded-lg font-bold py-2 px-4 rounded">
   <span className="text-sm font-light text-center">Authenticate with</span>
    <div className=" pt-1 items-center text-center justify-center" />
<a href="#" className="justify-center flex items-center text-2xl text-center font-semibold text-center">
<img className="w-8 h-8 mr-2" src="https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp" alt="logo" />
HashPack   
</a>
</button>
      </form>
    
</div>);
  } else if (interaction?.prompt == "consent") {
   // return (<p><h1>{interaction?.session}</h1><h1>{interaction?.dbg.params}</h1></p>);
   return <button onClick={handleClick}>Logout</button>
  } 
  return (
    <h1>Unhandled interaction prompt</h1>
   
  );
}
