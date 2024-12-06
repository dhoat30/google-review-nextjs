"use client";

import React, { useState } from "react";
import Input from './InputFields/Input'
import { contactFormData } from "@/utils/contactFormData";
import LoadingBtn from "../Buttons/LoadingBtn";
import Box from '@mui/material/Box';
import axios from "axios";
import styled from "@emotion/styled";


import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'


// const axios = dynamic(() => import("axios"));
const Alert = dynamic(() => import("@mui/material/Alert"));

export default function ContactForm({ className, formName = "Contact Form" }) {
    const router = useRouter()

    const [formData, setFormData] = useState({ typeOfService: [], formName: "Contact Form" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)

    const handleChange = (id, value, isSelectMultiple) => {
        let updatedValue = value;


        setFormData({ ...formData, [id]: updatedValue });
        // Reset errors on change
        if (errors[id]) {
            setErrors({ ...errors, [id]: false });
        }
    };

    const handleBlur = (id, validationFunction) => {
        if (!validationFunction(formData[id])) {
            setErrors({ ...errors, [id]: true });
        }
    };
    // submit handler 
    const submitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission if using form tag

        let allFieldsValid = true;
        const newErrors = {};

        // Loop through each field to check if it's required and valid
        contactFormData.forEach(field => {
            if (field.required && !formData[field.id]) {
                // Set field as invalid if it's required but empty or invalid
                newErrors[field.id] = true;
                allFieldsValid = false;
                return
            }
        });
        setErrors(newErrors);
        // If any required field is invalid, stop and don't make API calls
        if (!allFieldsValid) {
            return; // Stop the function if any field is invalid or empty
        }

        const data = {
            email: formData.email,
            formName: formName,
            message: `First Name: ${formData.firstname} \nEmail: ${formData.email} \nPhone: ${formData.phone} \nMessage: ${formData.message}`,
            portalID: "145323047",
            hubspotFormID: "55e20349-3d71-45ed-a6be-62524384a7dd",
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                },

                {
                    name: "phone",
                    value: formData.phone
                },
                {
                    name: "message",
                    value: formData.message
                }
            ]
        }

        setIsLoading(true)
        // Send an event to GA4 manually
        // if (typeof window !== 'undefined') {
        //     window.dataLayer = window.dataLayer || [];
        //     window.dataLayer.push({
        //         'event': 'contact_form', // The custom event name you configured in GTM
        //         'event_category': 'form_submit',
        //         'event_label': 'Speed Checker Form Submitted'
        //     });
        // }

        // hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: data
        };
        // mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: data
        };

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (responses) {
                console.log(responses)
                // responses[1] is the response from sendmail
                if (responses[0].status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    // set initial state to empty string 
                    setError(false)
                    router.push('/form-submitted/thank-you')

                }
                else {

                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(true)

                }

                // Other success logic
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(true)
            });
    }


    const formInputs = contactFormData.map((field, index) => {
        const isSelectMultiple = field.type === "select" && field.multiple; // Example condition

        return <Input
            key={index}
            label={field.label}
            type={field.type}
            value={isSelectMultiple ? formData[field.id] || [] : formData[field.id] || ''}
            onChange={(e) => handleChange(field.id, e.target.value, isSelectMultiple)}
            onBlur={field.required ? () => handleBlur(field.id, field.validation) : null} //check if the field is required then call the function 
            required={field.required}
            autoComplete={field.autoComplete}
            isInvalid={errors[field.id]}
            errorMessage={field.errorMessage}
            options={field.options}
            multipleValue={field.multiple}

        />
    })
    return (
        <Container className={`${className} py-8 `}>
            <Box sx={{ width: '100%' }}>
                <div className="input-wrapper p-6">

                    {
                        formInputs
                    }

                    <LoadingBtn newSubmission={newSubmission} onClick={submitHandler} isLoading={isLoading} isSuccess={isSuccess} >Contact now</LoadingBtn>

                    {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                </div>

            </Box>

        </Container>
    )
}

const Container = styled.form`
@media(max-width: 500px){ 
    .stepper-wrapper{ 
    display: none ;
}
}

.input-wrapper{ 
border-radius: 12px; 
   
    margin: 0 auto 0 auto; 
    @media(max-width: 500px){ 
        margin: 0 auto 0 auto;   
    }
    .Mui-error{ 
        font-size: 1rem;
    }
}

`

