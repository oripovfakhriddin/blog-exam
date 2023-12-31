import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Please fill..."),
  password: yup
    .string()
    .min(5, "The minimum number of characters is 5")
    .max(12, "The maximum number of characters is 12"),
});

export default loginSchema;
