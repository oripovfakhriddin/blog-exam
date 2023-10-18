import * as yup from "yup";

const editUserSchema = yup.object().shape({
  first_name: yup.string().required("Please fill..."),
  last_name: yup.string().required("Please fill !"),
  username: yup.string().min(4, "Username must be greater than 4!"),
  address: yup.string(),
  birthday: yup.string(),
  email: yup.string().email(),
  info: yup.string(),
  phoneNumber: yup.string(),
});

export default editUserSchema;
