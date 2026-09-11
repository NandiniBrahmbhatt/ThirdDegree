import { useState } from "react";
import LanguageContext from "./LanguageContext";

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((current) => (current === "en" ? "gu" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;