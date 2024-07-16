import * as Yup from "yup";
export const NewsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email Format"),
});
