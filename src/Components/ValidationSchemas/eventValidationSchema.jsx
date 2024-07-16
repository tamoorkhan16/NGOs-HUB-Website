import * as Yup from "yup";

export const eventValidationSchema = Yup.object().shape({
  text: Yup.string()
    .min(5, "Event name must be at least 5 characters long")
    .max(100, "Event name cannot exceed 100 characters")
    .required("Event name is required"),
  location: Yup.string()
    .min(5, "Location must be at least 5 characters long")
    .max(50, "Location cannot exceed 50 characters")
    .required("Location is required"),
  date: Yup.date()
    .min(new Date(), "Date must be today or a future date")
    .required("Date is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  time: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
    .required("Time is required"),
  img: Yup.mixed()
    .test(
      "fileSize",
      "File too large, maximum 2MB",
      (value) => value && value.file && value.file.size <= 2097152 // 2MB
    )
    .required("NGO Logo Image is required"),
});
