import * as Yup from "yup";

export const memberValidationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, "Member Name must be at least 3 characters long")
    .max(50, "Member Name cannot exceed 50 characters")
    .required("Member Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Member Email is required"),
  contact: Yup.string()
    .matches(/^(0)(3[0-9]{9}|5[0-9]{9}|6[0-9]{9}|7[0-9]{9}|8[0-9]{9}|9[0-9]{9})$/, "Invalid phone number format")
    .required("Member Phone Number is required"),
  blood: Yup.string()
    .matches(/^A\+|A\-|B\+|B\-|AB\+|AB\-|O\+|O\-$/, "Invalid Blood Group format")
    .required("Member Blood Group is required"),
  province: Yup.string()
    .min(3, "Member Province must be at least 3 characters long")
    .max(50, "Member Province cannot exceed 50 characters")
    .required("Member Province is required"),
  city: Yup.string()
    .min(3, "Member City must be at least 3 characters long")
    .max(50, "Member City cannot exceed 50 characters")
    .required("Member City is required"),
  address: Yup.string()
    .min(10, "Member Address must be at least 10 characters long")
    .required("Member Address is required"),
});


