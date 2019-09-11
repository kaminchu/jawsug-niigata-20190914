import React from "react";
import { render } from "react-dom";

import App from "./container/App";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

render(<ThemeProvider><CSSReset /><App /></ThemeProvider>, document.getElementById("app"));