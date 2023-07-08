import React, { useState } from "react";
import { ChartsHeader, Pie as PieChart } from "../../src/components";

const pieChartData = [
  { x: 'Scholar', y: 18, text: '25%' },
  { x: 'Scopus', y: 8, text: '50%' },
  { x: 'Journal', y: 15, text: '25%' },
];


const Runscrap = () => {
  const [loadingScholar, setLoadingScholar] = useState(false);
  const [loadingScopus, setLoadingScopus] = useState(false);

  const handleButtonClick = async (api) => {
    if (api === "scholar") {
      setLoadingScholar(true);
    } else if (api === "scopus") {
      setLoadingScopus(true);
    }

    let url = "";
    if (api === "scholar") {
      url = "http://localhost:8000/scraper/scholar";
    } else if (api === "scopus") {
      url = "http://localhost:8000/scraper/scopus-author";
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      if (api === "scholar") {
        setLoadingScholar(false);
      } else if (api === "scopus") {
        setLoadingScopus(false);
      }
    }
  };

  return (
    <div className="mt-10">
      <div className="flex flex-wrap justify-center">
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Google Scholar</p>
          </div>
          <div className="mt-0">
            <div className="mt-3">
              <p className="font-semibold text-lg">Run Scraper To Get All Data From Google Scholar</p>
              <div className="mt-3">
                <button
                  className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                  onClick={() => handleButtonClick("scholar")}
                  disabled={loadingScholar}
                >
                  {loadingScholar ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  ) : (
                    "Run"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Scopus</p>
          </div>
          <div className="mt-0">
            <div className="mt-3">
              <p className="font-semibold text-lg">Run Scraper To Get All Data From Scopus</p>
              <div className="mt-3">
                <button
                  className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                  onClick={() => handleButtonClick("scopus")}
                  disabled={loadingScopus}
                >
                  {loadingScopus ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  ) : (
                    "Run"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div class="w-200 bg-sky-600 flex flex-col rounded-lg p-7 m-3">
          <div>
            <h5 class="text-white text-2xl font-bold leading-none">
              Result Scholar
            </h5>
            <span class="text-xs text-gray-400 leading-none">......</span>
          </div>
          <div class="flex items-center">
            <div class="text-lg text-white font-light">
              $699,00
            </div>
          </div>
        </div>
        
        <div class="w-200 bg-blue-800 flex flex-col rounded-lg p-7 m-3">
          <div>
            <h5 class="text-white text-2xl font-bold leading-none">
              Result Scopus
            </h5>
            <span class="text-xs text-gray-400 leading-none">....</span>
          </div>
          <div class="flex items-center">
            <div class="text-lg text-white font-light">
              $699,00
            </div>
          </div>
        </div>
        <div class="w-200 bg-violet-800 flex flex-col rounded-lg p-7 m-3">
          <div>
            <h5 class="text-white text-2xl font-bold leading-none">
              Result Journal
            </h5>
            <span class="text-xs text-gray-400 leading-none">.....</span>
          </div>
          <div class="flex items-center">
            <div class="text-lg text-white font-light">
              $699,00
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-wrap justify-center">
        <div class="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
          <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
          </p>
        </div>
        {/* <div className="text-xl font-semibold">Result Data From Scholar</div> 
      </div> */}
    </div>
  );
};

export default Runscrap;
