"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import googleReviewFormData from "../../../utils/googleReviewFormData";
import axios from "axios";

// Define types for the form state and errors
type FormState = {
  [key: string]: string;
};

type ErrorState = {
  [key: string]: boolean;
};

// Props for the component
interface CreateGoogleReviewFormProps {
  className?: string;
  formName?: string;
}

const CreateGoogleReviewForm: React.FC<CreateGoogleReviewFormProps> = ({
  className = "",
  formName = "Create Google Review Form",
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({});
  const [errors, setErrors] = useState<ErrorState>({});
  const [errorText, setErrorText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Handle field value changes
  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Handle field validation on blur
  const handleBlur = (
    id: string,
    validationFunction?: (value: string) => boolean
  ) => {
    if (validationFunction && !validationFunction(formData[id] || "")) {
      setErrors((prev) => ({ ...prev, [id]: true }));
    }
  };
  // Submit handler
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ErrorState = {};
    let isFormValid = true;

    // Validate all fields
    googleReviewFormData.forEach((field) => {
      const value = formData[field.id] || "";
      if (
        field.required &&
        (!value || (field.validation && !field.validation(value)))
      ) {
        newErrors[field.id] = true;
        isFormValid = false;
      }
    });

    setErrors(newErrors);

    if (!isFormValid) return;

    // Prepare data for submission
    setIsLoading(true);

    // use auth sign function to sign in
    const data = {
      firstName: formData.firstname,
      lastName: formData.lastname,
    };

    axios.post("/api/create-google-review", data)
      .then((response) => {
        console.log(response);
        if(!response.data.success){ 
          setErrorText(response.message);
          setIsSuccess(false);
          setError(true);
          setIsLoading(false);
          return 
        } 
        console.log("data successful:", response);
          setIsLoading(false);
          setIsSuccess(true);
          setError(false);
      })
      .catch((error) => {
        console.log(error.response.statusText );
        setErrorText(error.response.statusText);
        setIsSuccess(false);
        setError(true);
        setIsLoading(false);
      });

   
  };

  return (
    <Box
      sx={{ maxWidth: 400, mx: "auto" }}
      component="form"
      onSubmit={submitHandler}
      className={className}
    >
      <Typography variant="h5" component="h1" align="center">
        Create Google Review
      </Typography>
      {googleReviewFormData.map((field) => (
        <TextField
          key={field.id}
          label={field.label}
          type={field.type}
          fullWidth
          margin="normal"
          required={field.required}
          value={formData[field.id] || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(field.id, e.target.value)
          }
          onBlur={() => handleBlur(field.id, field.validation)}
          error={Boolean(errors[field.id])}
          helperText={errors[field.id] ? field.errorMessage : ""}
        />
      ))}
      {error && (
        <Alert severity="error" className="mt-8 mb-8">
          {errorText}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Register"}
      </Button>
    </Box>
  );
};

export default CreateGoogleReviewForm;
