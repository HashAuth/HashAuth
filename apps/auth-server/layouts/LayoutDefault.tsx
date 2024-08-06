import "./tailwind.css";
import React from "react";
import { useData } from "vike-react/useData";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const interaction = useData<any>();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="p-4 mb-4 text-sm text-center text-blue-800 rounded-lg bg-blue-50" role="alert">
                HashAuth is currently in <span className="font-medium">early development</span>.
</div>
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                HashAuth
                
                  {interaction?.client ? <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                     On behalf of <span className="font-medium">{interaction.client.clientName}</span>
                  </p> : ""}
              </h1>
              
              <div className="space-y-4 md:space-y-6">
                
                 {children}
<p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
                     Report a bug | Terms and Conditions
                  </p>
              
              </div>
          </div>
      </div>
  </div>
</section>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div id="page-content" className="">
        <h1>test</h1>
        {children}
      </div>
    </div>
  );
}
