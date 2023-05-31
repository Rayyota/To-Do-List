import React from "react";

import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Frame from "../../components/Frame/Frame";

import "./Register.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { login } from "../../slices/AuthSlice";
import { useSignUpMutation } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loginRequest, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useSignUpMutation();
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const { t } = useTranslation();

  const handleRegister = () => {
    signUp({ email, login: loginRequest, password })
      .unwrap()
      .then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(login(true));
        navigate("/todos");
      });
  };

  const handlePolicyChange = (event) => {
    setIsPolicyChecked(event.target.checked);
  };

  return (
    <Layout>
      <div className="form__block">
        <Frame></Frame>
        <h2 className="form__header">{t("signup.header")}</h2>
        <p className="form__subtitle">{t("signup.info")}</p>
        <label className="form__label">{t("label.name")}</label>
        <Input
          type="name"
          className="form__input"
          value={loginRequest}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label className="form__label">{t("label.email")}</label>
        <Input
          type="email"
          className="form__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form__label">{t("label.password")}</label>
        <Input
          type="password"
          className="form__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="checkbox">
          <input onChange={handlePolicyChange} type="checkbox" />
          <span className="checkbox__box"></span>
          {t("registration.conditions")}
        </label>
        <Button
          id="submit"
          disabled={!isPolicyChecked}
          onClick={handleRegister}
        >
          {t("register.button")}
        </Button>
        <p className="form__foot">
          {t("register.question")}{" "}
          <Link to="/login" className="form__link">
            {t("login.button")}
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
