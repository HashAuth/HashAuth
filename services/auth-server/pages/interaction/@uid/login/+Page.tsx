import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const interaction = useData<Data>();
  return (
    <div>   
                  <button className="w-full bg-blue-500 hover:bg-blue-700 text-white text-center px-5 py-2.5 rounded-lg font-bold py-2 px-4 rounded">
                 Authenticate with
                  <div className=" pt-1 items-center text-center justify-center" />
      <a href="#" className="justify-center flex items-center text-2xl text-center font-semibold text-center">
        <img className="w-8 h-8 mr-2" src="https://cdn.prod.website-files.com/61ce2e4bcaa2660da2bb419e/62e14973c65367120073a891_app-icon.webp" alt="logo" />
          HashPack   
      </a>
</button>
</div>
  );
}
