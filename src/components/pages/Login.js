import React from "react";
import Header from "../Header";
import Form from "../Form";
import useValidation from "../../hooks/useValidation";

function Login(props) {
  const { values, onChange, resetValidation, isFormValid } = useValidation();

React.useEffect(() => {
  resetValidation({ email: "", password: "" });
}, []);
  function handleSubmitLogin(evt) {
    evt.preventDefault();
    props.onSubmitLogin(values)
  }
  return (
    <>
      <Header to="sign-up" text="Регистрация" loggedIn={props.loggedIn}/>
      <div className="page__conteiner">
        <Form
          title="Вход"
          onSubmit={handleSubmitLogin}
          labelSubmit="Войти"
          isFormValid={isFormValid}
          theme="light"
          children={
            <>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={values.email || ''}
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
                  onChange={onChange}
                  value={values.password || ''}
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
