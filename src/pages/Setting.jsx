import React, { useState, useEffect } from "react";
// import ReactJson from "react-json-view";

import cronstrue from 'cronstrue';

import axios from 'axios';

import Cron from "react-js-cron";
import 'react-js-cron/dist/styles.css'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import configURL from '../configURL'

const SettingPage = () => {
    let [baseURL, setBaseURL] = useState("");
    const [databaseURI, setDatabaseURI] = useState("");
    const [cronValue, setCronValue] = useState("");
    const [cronError, setCronError] = useState("");

    // const [terminalOutput, setTerminalOutput] = useState("");

    const [fetchbaseURL, setfetchbaseURL] = useState("");
    const [fetchDBbaseURI, setfetchDBbaseURI] = useState("");
    const [fetchCron, setfetchCron] = useState("");

    const style = document.createElement('style');
    style.innerHTML = `
    .green-confirm-button {
        background-color: green !important;
        color: white !important;
        box-shadow: 0 0 2px rgba(0, 128, 0, 0.7) !important;
    }
    .swal2-popup {
        width: 550px; /* Change this value to your desired width */
    }
    `;
    document.head.appendChild(style);

    const handleSaveUrlClick = async () => {
        if (baseURL) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save',
                customClass: {
                    confirmButton: 'green-confirm-button',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    console.log("Sending:", baseURL);
                    const url = `${configURL}baseurl/setUrl`;
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

                        setfetchbaseURL({ ...fetchbaseURL, url: baseURL })

                        const data = await response.json();
                        console.log(data);
                        // setTerminalOutput(JSON.stringify(data, null, 2));
                    } catch (error) {
                        console.error(error);
                        // setTerminalOutput(JSON.stringify(error, null, 2));
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    console.log("Changes are not saved");
                }
            });
        }
    };

    const handleSaveDBClick = async () => {
        if (databaseURI) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save',
                customClass: {
                    confirmButton: 'green-confirm-button',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    console.log("Sending DB URI:", databaseURI);
                    const url = `${configURL}conectionDB/connect-to-mongodb`;
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ databaseURI }),
                        });

                        if (!response.ok) {
                            throw new Error("Error: " + response.status);
                        }

                        const data = await response.json();
                        console.log(data);

                        setfetchDBbaseURI({ ...fetchDBbaseURI, url: databaseURI });

                        // setTerminalOutput(JSON.stringify(data, null, 2));
                    } catch (error) {
                        console.error(error);
                        // setTerminalOutput(JSON.stringify(error, null, 2));
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    console.log("Changes are not saved");
                }
            });
        }
    };

    const handleSaveCronClick = async () => {
        if (cronValue) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: false,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save',
                customClass: {
                    confirmButton: 'green-confirm-button',
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire('Saved!', '', 'success')
                    console.log("Set Cron:", cronValue);
                    const url = `${configURL}timecron/setCron`;
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ timeCron: cronValue })
                        });

                        if (!response.ok) {
                            throw new Error("Error: " + response.status);
                        }

                        const data = await response.json();
                        console.log(data);

                        setfetchCron({ ...fetchCron, cron: cronValue });

                        // setTerminalOutput(JSON.stringify(data, null, 2));
                    } catch (error) {
                        console.error(error);
                        // setTerminalOutput(JSON.stringify(error, null, 2));
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                    console.log("Changes are not saved");
                }
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2, response3] = await Promise.all([
                    axios.get(`${configURL}conectionDB/getDBUrl`),
                    axios.get(`${configURL}baseurl/getURL`),
                    axios.get(`${configURL}timecron/getCron`)
                ]);

                setfetchDBbaseURI(response1.data);
                setfetchbaseURL(response2.data);
                setfetchCron(response3.data);
                console.log("aaaaa",response1.data);
                console.log("bbbb", response2.data );
                console.log("bbbb", response3.data );
            } catch (error) {
                console.error('Error fetching data from APIs:', error);
            }
        };
        fetchData();
    }, []);

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
                        <p>Your last recorded Base URL: {fetchbaseURL.url}</p>
                        <div className="mt-2">
                            <form className="w-full ">
                                <div className="flex items-center border-b border-teal-500 py-2">
                                    <input
                                        id="settingUrl"
                                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        type="text"
                                        placeholder="Enter default URL"
                                        aria-label="settingUrl"
                                        value={baseURL}
                                        onChange={(e) => setBaseURL(e.target.value)}
                                    />
                                    <button
                                        className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                                        type="button"
                                        onClick={handleSaveUrlClick}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex flex-wrap justify-center">
                    <div className="w-2/3 bg-blue-200 flex flex-col rounded-lg p-7 m-2">
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold">
                                Setting Connection To Mongo Database
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="font-semibold text-lg">Input connection string</p>
                            <p>Your last recorded DB Connection URI: {fetchDBbaseURI.url}</p>
                            <div className="mt-2">
                                <form className="w-full ">
                                    <div className="flex items-center border-b border-teal-500 py-2">
                                        <input
                                            id="settingDB"
                                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                            type="text"
                                            placeholder="Enter Connection String"
                                            aria-label="settingDB"
                                            value={databaseURI}
                                            onChange={(e) => setDatabaseURI(e.target.value)}
                                        />
                                        <button
                                            className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                                            type="button"
                                            onClick={handleSaveDBClick}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex flex-wrap justify-center">
                    <div className="w-2/3 bg-sky-200 flex flex-col rounded-lg p-7 m-1">
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold">Cron Schedule Setting</p>
                        </div>
                        <div className="mt-0">
                            <div className="mt-3">
                                <p className="font-semibold text-lg">Select Schedule</p>
                                {/* <p>Your last recorded CronValue : {fetchCron.cron}</p> */}
                                {/* <p>Your last recorded CronValue: {cronstrue.toString(fetchCron.cron)}</p> */}
                                <p>Your last recorded CronValue: {fetchCron.cron ? cronstrue.toString(fetchCron.cron) : 'Loading...'}</p>
                                <div className="mt-3">
                                    <Cron
                                        value={cronValue} setValue={setCronValue} onError={setCronError}
                                    />
                                    <button
                                        className={`flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded`}
                                        type="button"
                                        onClick={handleSaveCronClick}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="mt-5">
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
            </div> */}

        </div>
    );
};

export default SettingPage;