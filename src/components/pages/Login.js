import React from "react";
import Header from "../Header";
import Form from "../Form";

function Login(props) {

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    console.log("Submit login");
  }
  return (
    <>
      <Header to="sign-up" text="Регистрация" loggedIn={props.loggedIn}/>
      <div className="page__conteiner">
        <Form
          title="Вход"
          onSubmit={handleSubmitLogin}
          labelSubmit="Войти"
          isFormValid={true}
          theme="light"
          children={
            <>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="email"
                  name="email"
                  placeholder="Email"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__error"></span>
              </label>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__error"></span>
              </label>
            </>
          }
        />
      </div>
    </>
  );
}

export default Login;
