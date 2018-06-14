import Greeter from "./Greeter";
import React from "react";
import ReactDom from "react-dom";
import DateApp from "./DateApp.jsx";

var a=new Greeter();
document.getElementById('root').innerHTML=a.add();

ReactDom.render(<DateApp/>,document.getElementById("date"));