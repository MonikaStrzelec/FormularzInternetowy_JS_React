import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./Views/Forms/Step1";
import Step2 from "./Views/Forms/Step2";
import Step3 from "./Views/Forms/Step3";
import Footer from "./Views/Footer";
import "./App.css";

createStore({});


export default function App() {
  return (
    <StateMachineProvider>
      <Router>
        <Route exact path="/" component={Step1} />
        <Route path="/Step2" component={Step2} />
        <Route path="/Step3" component={Step3} />
      </Router>
      <Footer />
    </StateMachineProvider>
  );
}
