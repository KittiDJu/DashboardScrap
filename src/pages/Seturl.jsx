import React, { useState } from "react";
import ReactJson from "react-json-view";

const SetUrl = () => {
  const [baseURL, setbaseURL] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");


  const handleSaveClick = async () => {
    if (baseURL) {
      console.log("Sending:", baseURL);
      const url = "http://localhost:8000/baseurl/setUrl";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ baseURL }),
        });

        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }

        const data = await response.json();
        console.log(data);
        setTerminalOutput(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error(error);
        setTerminalOutput(JSON.stringify(error, null, 2));
      }
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-center">
        <div className="w-2/3 bg-blue-200 flex flex-col rounded-lg p-7 m-2">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">
              Setting Base URL
            </p>
          </div>
          <div className="mt-4">
            <p className="font-semibold text-lg">Enter the default URL for data extraction from the Scopus website.</p>
            <div className="mt-2">
              <form className="w-full ">
                <div className="flex items-center border-b border-teal-500 py-2">
                  <input
                    id="settingDB"
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter default URL"
                    aria-label="settingDB"
                    value={baseURL}
                    onChange={(e) => setbaseURL(e.target.value)}
                  />
                  <button
                    className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                    type="button"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1">
        <div className="flex flex-wrap justify-center">
          <div className="w-2/3 bg-black text-white rounded-lg p-6 m-2">
            <p className="text-lg font-semibold pb-2">Output:</p>
            {terminalOutput && (
              <ReactJson
                src={JSON.parse(terminalOutput)}
                theme="monokai"
                displayDataTypes={false}
                displayObjectSize={false}
                indentWidth={2}
                iconStyle="circle"
                style={{ maxHeight: "500px", overflow: "auto" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetUrl;
