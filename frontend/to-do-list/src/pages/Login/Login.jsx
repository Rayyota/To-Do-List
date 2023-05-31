import React from "react";

import Layout from "../../components/Layout/Layout";
import Frame from "../../components/Frame/Frame";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useSignInMutation } from "../../api/AuthApi";
import { login } from "../../slices/AuthSlice";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn] = useSignInMutation();
  const { t } = useTranslation();

  const handleLogin = () => {
    signIn({ email, password })
      .unwrap()
      .then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(login(true));
        navigate("/todos");
      });
  };

  return (
    <Layout>
      <div className="form__block">
        <Frame></Frame>
        <h2 className="form__header">{t("signin.header")}</h2>
        <p className="form__subtitle">{t("signin.info")}</p>
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
          <input type="checkbox" />
          <span className="checkbox__box"></span>
          {t("remember.me")}
        </label>
        <Button onClick={handleLogin}>{t("signin.button")}</Button>
        <p className="form__foot">
          {t("login.question")}{" "}
          <Link to="/" className="form__link">
            {t("create.one")}
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
