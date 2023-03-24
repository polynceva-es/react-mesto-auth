import React from "react";
import Header from "../Header";
import Form from "../Form";
import InfoTooltip from "../InfoTooltip";
import useValidation from "../../hooks/useValidation";
import authorizationTrue from "../../images/authorization_true.svg";
import authorizationFalse from "../../images/authorization_false.svg";
import { Link } from "react-router-dom";

function Register(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const isOpen = isPopupOpen;
  const { values, onChange, resetValidation, isFormValid } = useValidation();
React.useEffect(() => {
  resetValidation({ email: "", password: "" });
}, []);
  const textauthorizationTrue = "Вы успешно зарегистрировались!";
  const textauthorizationFalse = "Что-то пошло не так! Попробуйте ещё раз.";
  function closePopup() {
    setIsPopupOpen(false);
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    console.log("Submit Register");
    // register(values).then((res)=>
    //   {if(res.status !== 400) {setLoggedIn(true); setIsPopupOpen(true)}}
    //   );
    props.onSubmitRegister(values);
    //if server OK => setIsPopupOpen(true);
  }
  return (
    <>
      <Header to="sign-in" text="Войти" loggedIn={props.loggedIn}/>
      <div className="page__conteiner">
        <Form
          title="Регистрация"
          onSubmit={handleSubmitRegister}
          labelSubmit="Зарегистрироваться"
          isFormValid={isFormValid}
          theme="light"
          children={
            <>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="email"
                  name="email"
                  value={values.email || ''}
                  onChange={onChange}
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
                  value={values.password || ''}
                  onChange={onChange}
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
        <Link to="/sign-in" className="form__caption">Уже зарегистрированы? Войти</Link>
      </div>
      <InfoTooltip
        isOpen={isOpen}
        onClose={closePopup}
        children={
          <div className="authorization">
            <img 
              className="authorization__image" 
              src={(props.loggedIn ? authorizationTrue : authorizationFalse)} 
              alt="Image"
            />
            <p className="authorization__text">
              {props.loggedIn ? textauthorizationTrue : textauthorizationFalse}
            </p>
          </div>
        }
      />
    </>
  );
}

export default Register;
