import React from "react";
import { useTranslation } from "react-i18next";
import "./Frame.css";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

const Frame = () => {
  const { t } = useTranslation();
  return (
    <div className="frame__block">
      <h2 className="frame__title">{t("frame.text")}</h2>
      <LanguageSwitch />
    </div>
  );
};

export default Frame;
