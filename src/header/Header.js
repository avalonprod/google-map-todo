import { useState } from "react";
import { Link } from "react-router-dom";
import CheckTheme from "../checkTheme/CheckTheme";

import "./header.css";

const Header = ({sendTheme}) => {
  let [blackTheme, setBlackTheme] = useState();
  let [active1, setActive1] = useState("active");
  let [active2, setActive2] = useState("");

  const getTheme = (theme) => {
    setBlackTheme(!theme);
    sendTheme(!theme)
  };

  let theme = "";
  if (blackTheme) {
    theme = " black__theme";
  } else {
    theme = "";
  }
  

  return (
    <div className={"header" + theme}>
      <CheckTheme getTheme={getTheme} />
      <Link
        to="/"
        className={`${active1}`}
        onClick={() => {
          setActive1("active");
          setActive2("");
        }}
      >
        Public
      </Link>
      <Link
        to="/private"
        className={`${active2}`}
        onClick={() => {
          setActive1("");
          setActive2("active");
        }}
      >
        Private
      </Link>
    </div>
  );
};

export default Header;
