import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Form from "../Form";
import InfoTooltip from "../InfoTooltip";
import autorisationTrue from "../../images/autorisation_true.svg";
import autorisationFalse from "../../images/autorisation_false.svg";

function Register() {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [autorisation, setAutorisation] = React.useState(false);
  const isOpen = isPopupOpen;
  const textAutorisationTrue = "Вы успешно зарегистрировались!";
  const textAutorisationFalse = "Что-то пошло не так! Попробуйте ещё раз.";
  function closePopup() {
    setIsPopupOpen(false);
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    console.log("Submit Register");
  }
  return (
    <>
      <Header to="sing-up" text="Войти" />
      <button onClick={() => navigate(-1)}>back</button>
      <div className="page__conteiner">
        <Form
          title="Регистрация"
          onSubmit={handleSubmitRegister}
          labelSubmit="Зарегистрироваться"
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
        <p className="form__caption">Уже зарегистрированы? Войти</p> //Сделать ссылку на Войти
      </div>
      <InfoTooltip
        isOpen={isOpen}
        onClose={closePopup}
        children={
          <div className="autorisation">
            <img 
              className="autorisation__image" 
              src={(autorisation ? autorisationTrue : autorisationFalse)} 
              alt="Image"
            />
            <p className="autorisation__text">
              {autorisation ? textAutorisationTrue : textAutorisationFalse}
            </p>
          </div>
        }
      />
    </>
  );
}

export default Register;
