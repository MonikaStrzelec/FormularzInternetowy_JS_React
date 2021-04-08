import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";

const Step1 = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { actions, state } = useStateMachine({ updateAction }); //zwraca stan aplikacji

  const onSubmit = (data) => {
    console.log(data);
    actions.updateAction(data);
    props.history.push("./Step2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Step 1</h2>
      <label> Imię:</label>
      <input
        {...register("firstName", { required: true, maxLength: 50 })}
        defaultValue={state.firstName}
        name="firstName"
      />
      {errors.firstName && "To pole jest wymagane"}
      <label> Nazwisko:</label>
      <input
        {...register("name", { required: true, maxLength: 60 })}
        defaultValue={state.name}
        name="name"
      />
      {errors.name && "To pole jest wymagane"}

      <label>Numer telefonu:</label>
      <input
        {...register("numberPhone", {
          max: 9,
          pattern: "\\d{3} \\d{3} \\d{3}",
        })}
        placeholder="Zapisz numer telefonu w formacie: XXX XXX XXX"
        defaultValue={state.numberPhone}
        name="numberPhone"
      />
      {errors.numberPhone && "Zapisz numer telefonu poprawnie"}

      <label>Email:</label>
      <input
        {...register("email", { pattern: /^\S+@\S+$/i })}
        defaultValue={state.email}
        name="email"
      />
      {errors.email && "Zapisz poprawny adres e-mail"}

      <input type="submit" value="Następny krok" />
    </form>
  );
};

export default withRouter(Step1);
