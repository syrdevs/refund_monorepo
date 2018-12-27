import kk from "../locales/kk_KZ";
import ru from "../locales/ru-RU";

const LANGUAGE = localStorage.getItem("LANGUAGE");

module.exports = (langItem) => {
  if (LANGUAGE === "kz")
    return kk[langItem.id];
  return ru[langItem.id];
};