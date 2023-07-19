import React, { useState } from "react";
import ReactJson from "react-json-view";

const Scholar = () => {
  const [loadingScholar, setLoadingScholar] = useState(false);
  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [authorscholarId, setAuthorScholarId] = useState("");
  const [articlescholarId, setArticleScholarId] = useState("");
  const [terminalOutput, setTerminalOutput] = useState("");

  const handleButtonClick = async (api) => {
    if (api === "scholar") {
      setLoadingScholar(true);
    } else if (api === "author") {
      setLoadingAuthor(true);
    } else {
      setLoadingArticle(true);
    }

    let url = "";
    if (api === "scholar") {
      url = `http://localhost:8000/scraper/scholar`;
    } else if (api === "author") {
      url = `http://localhost:8000/scraper/scraper-author-scholar?id=${authorscholarId}`;
    } else {
      url = `http://localhost:8000/scraper/scraper-article-scholar?id=${articlescholarId}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      const data = await response.json();
      console.log(data);
      setTerminalOutput(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setTerminalOutput(JSON.stringify(error));
    } finally {
      if (api === "scholar") {
        setLoadingScholar(false);
      } else if (api === "author") {
        setLoadingAuthor(false);
      } else {
        setLoadingArticle(false);
      }
    }
  };

  return (
    <div className="mt-5">
      <div className="flex flex-wrap justify-center">
        <div className="w-2/3 bg-sky-200 flex flex-col rounded-lg p-7 m-1">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Google Scholar</p>
          </div>
          <div className="mt-0">
            <div className="mt-3">
              <p className="font-semibold text-lg">Run scraper to get all data from google scholar</p>
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
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/3 bg-indigo-200 flex flex-col rounded-lg p-7 m-2">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Author Data</p>
          </div>
          <div className="mt-0">
            <div className="mt-3">
              <p className="font-semibold text-lg">Run scraper to get authors</p>
              <div className="mt-3">
                <form className="w-full max-w-sm">
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      id="scholarIdInput"
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Enter Scholar ID"
                      aria-label="author"
                      value={authorscholarId}
                      onChange={(e) => setAuthorScholarId(e.target.value)}
                    />
                    <button
                      className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                      type="button"
                      onClick={() => handleButtonClick("author")}
                      disabled={loadingAuthor}
                    >
                      {loadingAuthor ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : (
                        "Run"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-blue-200 flex flex-col rounded-lg p-7 m-2">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Article Data</p>
          </div>
          <div className="mt-0">
            <div className="mt-3">
              <p className="font-semibold text-lg">Run scraper to get articles</p>
              <div className="mt-3">
                <form className="w-full max-w-sm">
                  <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                      id="scholarIdInput"
                      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Enter Scholar ID"
                      aria-label="author"
                      value={articlescholarId}
                      onChange={(e) => setArticleScholarId(e.target.value)}
                    />
                    <button
                      className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                      type="button"
                      onClick={() => handleButtonClick("article")}
                      disabled={loadingArticle}
                    >
                      {loadingArticle ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          <span className="ml-2">Loading...</span>
                        </div>
                      ) : (
                        "Run"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <div className="flex flex-wrap justify-center">
          <div className="w-2/3 bg-black text-white rounded-lg p-6 m-2">
            <p className="text-lg font-semibold pb-2">Output:</p>
            {loadingScholar || loadingAuthor || loadingArticle ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              terminalOutput && (
                <ReactJson
                  src={JSON.parse(terminalOutput)}
                  theme="monokai"
                  displayDataTypes={false}
                  displayObjectSize={false}
                  indentWidth={2}
                  iconStyle="circle"
                  style={{ maxHeight: "500px", overflow: "auto" }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholar;
