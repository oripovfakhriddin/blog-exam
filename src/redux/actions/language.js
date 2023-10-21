import { CHANGELANGUAGE } from "../types/language";

const changeLanguage = (payload) => {
  return { type: CHANGELANGUAGE, payload };
};

export default changeLanguage;
