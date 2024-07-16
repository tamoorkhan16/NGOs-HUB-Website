import * as Yup from "yup";

export const ngoValidationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, "NGO Name must be at least 3 characters long")
    .max(50, "NGO Name cannot exceed 50 characters")
    .required("NGO Name is required"),
  domain: Yup.string()
    .min(3, "NGO Domain must be at least 3 characters long")
    .max(50, "NGO Domain cannot exceed 50 characters")
    .required("NGO Domain is required"),
  date: Yup.date()
    .max(new Date(), "Established Date cannot be in the future")
    .required("NGO Established Date is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("NGO Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{11}$/, "NGO Phone Number must be exactly 11 digits")
    .required("NGO Phone Number is required"),
  address: Yup.string()
    .min(10, "NGO Address must be at least 10 characters long")
    .required("NGO Address is required"),
  link: Yup.string()
    .url("Invalid URL format")
    .required("NGO URL Link is required"),
  img: Yup.mixed()
    .test(
      "fileSize",
      "File too large, maximum 2MB",
      (value) => value && value.file && value.file.size <= 2097152 // 2MB
    )
    .required("NGO Logo Image is required"),
  description: Yup.string()
    .min(10, "NGO Description must be at least 10 characters long")
    .max(500, "NGO Description cannot exceed 500 characters")
    .required("NGO Description is required"),
});
