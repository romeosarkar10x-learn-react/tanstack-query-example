import React, { useState } from "react";
import "./App.css";
import BrowserTime from "./components/BrowserTime";
import ServerTime from "./components/ServerTime";
import Button from "./components/Button";

function App() {
    const [displayServerTime, setDisplayServerTime] = useState(false);

    return (
        <div className="flex flex-col items-center mt-4 gap-2">
            <Button
                onClick={() => {
                    setDisplayServerTime((value) => !value);
                }}
            >
                {displayServerTime ? "Hide" : "Show"} 'ServerTime'
            </Button>
            <div>
                <BrowserTime />
            </div>

            <div>{displayServerTime ? <ServerTime /> : <React.Fragment />}</div>
        </div>
    );
}

export default App;
