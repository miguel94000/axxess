import { UseGlobalChangeLang } from "src/stores/authStore";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    UseGlobalChangeLang(lang);
    i18n.changeLanguage(lang).catch((error) => console.error(error));
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => changeLanguage("en")}
        className="flex items-center space-x-2"
      >
        <Image
          src="/icons/flags/en.svg"
          alt={t("language.en")}
          className="size-6"
          width={24}
          height={24}
        />
      </button>
      <button
        onClick={() => changeLanguage("fr")}
        className="flex items-center space-x-2"
      >
        <Image
          src="/icons/flags/fr.svg"
          alt={t("language.fr")}
          className="size-6"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
