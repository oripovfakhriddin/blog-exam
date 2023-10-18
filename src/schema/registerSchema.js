import * as yup from "yup";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("Please fill..."),
  last_name: yup.string().required("Please fill !"),
  username: yup.string().required("Please fill..."),
  password: yup
    .string()
    .min(5, "The minimum number of characters is 5")
    .max(12, "The maximum number of characters is 12"),
});

export default registerSchema;
