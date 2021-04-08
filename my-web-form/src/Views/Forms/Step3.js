import React from "react";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step3 = ({ props, startTime }) => {
  const { state } = useStateMachine(updateAction);

  var secondBetweenTwoDate = Math.abs(
    (new Date().getTime() - startTime) / 1000
  );
  console.log("START TIME ====== " + JSON.stringify(secondBetweenTwoDate));

  return (
    <>
      <h2>Krok 3:</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <label>Wypełnienie formularza zajęło ci:</label>
      <div>{` `},</div>
    </>
  );
};
export default Step3;
