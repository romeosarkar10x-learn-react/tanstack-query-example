import "./App.css";
import BrowserTime from "./components/BrowserTime";
import ServerTime from "./components/ServerTime";

function App() {
    return (
        <>
            <ServerTime />
            <BrowserTime />
        </>
    );
}

export default App;
