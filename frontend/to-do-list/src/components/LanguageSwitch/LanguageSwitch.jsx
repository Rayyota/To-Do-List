import React from "react";
import { useTranslation } from "react-i18next";

import "./LanguageSwitch.css";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div>
      <button className="toggle-language-button" onClick={handleLanguageToggle}>
        <span>{i18n.language === "en" ? "ru" : "en"}</span>
      </button>
    </div>
  );
};

export default LanguageSwitch;
