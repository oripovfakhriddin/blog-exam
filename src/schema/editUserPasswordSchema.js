import * as yup from "yup";

const editUserPasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Please fill..."),
  newPassword: yup
    .string()
    .min(5, "The minimum number of characters is 5")
    .max(12, "The maximum number of characters is 12"),
    confirmPassword: yup
    .string()
    .min(5, "The minimum number of characters is 5")
    .max(12, "The maximum number of characters is 12"),
});

export default editUserPasswordSchema;