import { BLOGLANGUAGE } from "../../constants";
import EN from "../../data/language/en";
import UZ from "../../data/language/uz";
import { CHANGELANGUAGE } from "../types/language";

const languages = {
  uz: UZ,
  en: EN,
};

const languageType = localStorage.getItem(BLOGLANGUAGE) || "en";

const initialState = {
  languageType,
  language: languages[languageType],
};

const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGELANGUAGE:
      localStorage.setItem(BLOGLANGUAGE, payload);
      return { languageType: payload, language: languages[payload] };
  }
  return state;
};

export default languageReducer;
