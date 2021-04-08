import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step2 = (props) => {
  const {
    register,
    handleSubmit,
   // formState: { errors },
    getValues,
  } = useForm();

  let typeOfDucumentText = "";

  const { actions, state } = useStateMachine({ updateAction });

 // const onError = (errors, e) => console.log(errors, e);

  const onSubmit = (data) => {
    console.log(data);
    actions.updateAction(data);
    props.history.push("./step3"); //zapisywanie i przejscie dalej
  };

  const [idCard, setIdCard] = useState(false);

  const [birthDate, setBirthDate] = useState("");

  const DateWithPesel = (pesel) => {
    console.log("date from pesel === ");
    let year = parseInt(pesel.substring(0, 2), 10);
    let month = parseInt(pesel.substring(2, 4), 10);
    let day = parseInt(pesel.substring(4, 6), 10);
    if (month > 80) {
      year = year + 1800;
      month = month - 80;
    } else if (month > 60) {
      year = year + 2200;
      month = month - 60;
    } else if (month > 40) {
      year = year + 2100;
      month = month - 40;
    } else if (month > 20) {
      year = year + 2000;
      month = month - 20;
    } else {
      year += 1900;
    }
    month = month.toString();
    if (month.length < 2) {
      month = "0" + month;
    }
    let formattedBirthDate = `${day}-${month}-${year}`;
    state.birthDate = formattedBirthDate;

    console.log("STATE CCLASSS ====" + JSON.stringify(state));

    setBirthDate(formattedBirthDate);
  };

  const handleChangeOfDocument = (e) => {
        let valueOfDocument = e.target.value;
        typeOfDucumentText = typeOfIdentyficationDocument(valueOfDocument);
        state.documentType = valueOfDocument;
        setIdCard(valueOfDocument);
  }

  const handleBirthDate = (e) => {
    const pesel = e.target.value;
    console.log("handle birdth date ====" + pesel);
    const regex = /^[0-9]{11}$/;
    if (!regex.test(pesel)) {
      console.log("FAŁSZYWY REGEX !!");
      setBirthDate("");
    } else {
      if (parseInt(pesel.substring(4, 6)) < 31) {
        if (parseInt(pesel.substring(2, 3)) % 2 === 0) {
          DateWithPesel(pesel);
        } else if (parseInt(pesel.substring(3, 4)) <= 2) {
          DateWithPesel(pesel);
        }
      }
      state.pesel = pesel;
    }
  };

  const typeOfIdentyficationDocument = (idCard) => {
    if (idCard === "") return "Numer dokumentu tożsamości";
    if (idCard === "id") return "Numer dowodu osobistego";
    if (idCard === "passport") return "Numer paszportu";
  };

  const handleChangeOfNumberDocument = (e) =>{
      let value = e.target.value;
      setIdCard = value;
      state.numbrID = value;
  }

  // handleSubmit: Ta funkcja otrzyma dane formularza, jeśli walidacja formularza zakończy się pomyślnie.

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 2</h2>

      <label> PESEL</label>
      <input
        defaultValue={state.PESEL}
        type="number"
        name="PESEL"
        {...register("PESEL")}
        //onChangeText={(state) => handleBirthDate(state.PESEL)}
        onChange={(e) => {
          handleBirthDate(e);
        }}
        // onChange={(e) => {
        //   handleBirthDate(e);}}
      />
     

      <label>Data urodzenia:</label>
      <input
        //  type="date"
        {...register("brithDate")}
        value={birthDate}
        name="birthDate"
        //onChange={e => setValue("birthDate", e.target.value)}
        //onChange={(brithDate) => setBirthDate(birthDate)}
        // onChange={(e) => {
        //   console.log("data urodzenia change === " + e.target.value);
        //   setBirthDate(birthDate);
        // }}
      />

      <label>Typ dokumentu tożsamości:</label>
      <select
        name="IDcard"
        type="text"
        {...register("IDcard")}
        onChange={(e) => {
          //setIdCard(!idCard);
          handleChangeOfDocument(e);
          //handleChange(e);
        }}
        // state={(e) => {
        //   setValue(!value);
        // }}
      >
        <option value="">Typ dokumentu tożsamości:</option>
        <option value="id">Dowód osobisty</option>
        <option value="passport">Paszport</option>
      </select>

      <label> {typeOfDucumentText}</label>
      <input
        {...register("numbrID", { maxLength: 20 })}
        type="text"
        name="numbrID"
        onChange={(e) => handleChangeOfNumberDocument(e)}
      />

      {/* <label value="numbrID">{typeOfDocumentText()}</label>
			<input
				type="text"
				name="numbrID"
				placeholder={typeOfDocumentText()}
				{...register("numbrID")}
                defaultValue={state.numbrID}
			/> */}
      {/* {errors.numbrID && "Twój pesel jest za długi"} */}

      <button
        type="button"
        onClick={() => {
          alert(JSON.stringify(state));
        }}
      >
        Get Values
      </button>

      <input type="submit" value="Następny krok" />
    </form>
  );
};

export default withRouter(Step2);
