
'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert  from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import syncGoogleReviewsData from "../../../../../utils/syncGoogleReviewsData";
import axios from "axios";
import { signIn } from "next-auth/react";
import ProviderButtons from "../../../Auth/ProviderButtons/ProviderButtons";
import styled from "@emotion/styled";
// Define types for the form state and errors
type FormState = {
  [key: string]: string;
};

type ErrorState = {
  [key: string]: boolean;
};

// Props for the component
interface SynchGoogleReviewProps {
  className?: string;
  formName?: string;
}

const SyncGoogleReviewsForm: React.FC<SynchGoogleReviewProps> = ({
  className = "",
  formName = "Checkout Form",
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({});
  const [errors, setErrors] = useState<ErrorState>({});
  const [errorText, setErrorText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
const[showInputField, setIsInputFieldShowing]=useState<boolean>(false)
  // Handle field value changes
  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Handle field validation on blur
  const handleBlur = (id: string, validationFunction?: (value: string) => boolean) => {
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
    syncGoogleReviewsData.forEach((field) => {
      const value = formData[field.id] || "";
      if (field.required && (!value || (field.validation && !field.validation(value)))) {
        newErrors[field.id] = true;
        isFormValid = false;
      }
    });

    setErrors(newErrors);

    if (!isFormValid) return;

    // Prepare data for submission
    setIsLoading(true);

    // use auth sign function to sign in
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    console.log(result);
    if (result) {
      if(result.error) {
      console.error(result.error);
      setErrorText(result.error);
      setIsSuccess(false)
      setError(true);
      setIsLoading(false);
      return 
      } 
      else {
        console.log("Login successful:", result);
        setIsLoading(false);
        setIsSuccess(true);
        setError(false);
        router.push("/dashboard");
      }
    } 
  } 

  return (
    <BoxStyle
      sx={{ maxWidth: 400, mx: "auto" }}
      component="form"
      onSubmit={submitHandler}
      className={`${className}` }
    >

      {syncGoogleReviewsData.map((field) => (
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
      {error && <Alert severity="error" className="mt-8 mb-8">{errorText}</Alert>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        className="mt-8 "
      >
        {isLoading ? "..." : "Sync google reviews"}
      </Button>
     
    </BoxStyle>
  );
};

export default SyncGoogleReviewsForm;

const  BoxStyle = styled(Box)`


`