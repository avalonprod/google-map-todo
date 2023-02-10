import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Private from "../pages/Private";
import Public from "../pages/Public";
import Header from "../header/Header";

import './app.css'


const App = () =>{
    let [blackTheme, setBlackTheme] = useState();
  
    const getTheme = (theme) => {
      setBlackTheme(theme);
    };
  
    let theme = "";
    if (blackTheme) {
      theme = " black__theme";
    } else {
      theme = "";
    }

    return(
        <Router>
            <div className={"app"+theme}>
                <Header sendTheme={getTheme}/>
                <main className="main">
                    <Routes>
                        <Route path="/"  element={<Public/>}/>
                        <Route exact path="/private" element={<Private/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
