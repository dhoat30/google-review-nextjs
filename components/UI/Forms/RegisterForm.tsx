
'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import registerFormdata from "../../../utils/registerFormdata";
import axios from "axios";
import ProviderButtons from "../Auth/ProviderButtons/ProviderButtons";
import { signIn } from "next-auth/react";

// Define types for the form state and errors
type FormState = {
  [key: string]: string;
};

type ErrorState = {
  [key: string]: boolean;
};

// Props for the component
interface RegisterFormProps {
  className?: string;
  formName?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
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
    registerFormdata.forEach((field) => {
      const value = formData[field.id] || "";
      if (field.required && (!value || (field.validation && !field.validation(value)))) {
        newErrors[field.id] = true;
        isFormValid = false;
      }
    });

    setErrors(newErrors);

    if (!isFormValid) return;

    // Prepare data for submission
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      provider: 'credentials',
    };

    setIsLoading(true);

    try {
     
      const response = await axios.post("/api/register", data)
      console.log(response)

      setIsLoading(false);

      // if the user is created then sign in the user 
      if (response.data.success) {
        // Registration successful, now sign in the user
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult.error) {
          setError(signInResult.error);
          console.error(signInResult);
          setErrorText(signInResult.error);
          setIsSuccess(false)
          setError(true);
          setIsLoading(false);
         
        } else {
          setIsLoading(false);
          setIsSuccess(true);
          setError(false);
                    // Redirect to the desired page after successful login

          router.push("/create-post");
        }
      } else {
        setError(true);
        setErrorText(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setErrorText("An error occurred during registration.");
    }
  };

  return (
    <Box
      sx={{ maxWidth: 400, mx: "auto" }}
      component="form"
      onSubmit={submitHandler}
      className={className}
    >
      <Typography variant="h5" component="h1" align="center">
        Register
      </Typography>
      {registerFormdata.map((field) => (
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
      {error && <Alert severity="error" className="mt-8 mb-8">{errorText} </Alert>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Register"}
      </Button>
      <ProviderButtons/> 
    </Box>
  );
};

export default RegisterForm;
