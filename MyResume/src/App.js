import { Routes, Route } from "react-router-dom";

import MyResumeMain from "./components/MyResumeMain.js";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MyResumeMain />} />
            </Routes>
        </>
    );
}

export default App;
