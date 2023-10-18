import * as yup from "yup";

const newPostSchema = yup.object().shape({
  title: yup.string().required("Please fill..."),
  description: yup.string().required("Please fill !"),
  category: yup.string(),
  photo: yup.required,
});

export default newPostSchema;
