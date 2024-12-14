import React, { useState } from "react";
import Button from "@mui/material/Button";

import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  className: string;
}

function SimpleDialog({
  open,
  selectedValue,
  onClose,
  className,
}: SimpleDialogProps) {
  const [errorText, setErrorText] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  const handleClose = () => {
    onClose(selectedValue);
    setIsSuccess(false);
    setIsLoading(false);
    setErrorText("");
    setImagePreview(null);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const businessMapUrl = formJson.url;
    const businessName = formJson.businessName;
    const image = formJson.image;
    setIsLoading(true);
    setErrorText("");

    try {
      const result = await axios.post(
        "/api/business/add-business",
        {
          businessMapUrl: businessMapUrl,
          businessName: businessName,
          image: image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      const resultData = await result.data;
      console.log("results", resultData);

      if (result.status === 201) {
        // fetch google revies
          setIsSuccess(true);
          setIsLoading(false);
          setTimeout(() => {
            handleClose();
          }, 2000);
      } else {
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsSuccess(false);
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorText(`${error.response?.data.message}` || "An error occurred");
      } else if (error instanceof Error) {
        setErrorText(error.message);
      } else {
        setErrorText("An unknown error occurred");
      }
    }
  };

  return (
    <DialogStyled
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleFormSubmission,
      }}
    >
      <div className="wrapper">
        <DialogTitle>Add a business</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please find the location map url and enter it below. Our system will
            sync all good reviews from Google Business Profile.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="businessName"
            name="businessName"
            label="Enter business name"
            type="text"
            fullWidth
            variant="outlined"
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="url"
            name="url"
            label="Enter location map url"
            type="url"
            fullWidth
            variant="outlined"
          />
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            className="mt-16"
          >
            Upload Logo
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageChange} // Call handleImageChange on file select

              name="image"
              id="image"
              required
            />
          </Button>
              {/* Display the uploaded image preview */}
              {imagePreview && (
            <div className="image-wrapper mt-16">
              <img
                src={imagePreview}
                alt="Uploaded Logo"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Syncing..." : "Add Business"}
          </Button>
        </DialogActions>
        <DialogContent>
          {" "}
          {!isSuccess && errorText && (
            <Alert severity={"error"}>{errorText}</Alert>
          )}
        </DialogContent>
      </div>
    </DialogStyled>
  );
}

export default function AddBusinessForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <Div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Business
      </Button>
      <SimpleDialog open={open} onClose={handleClose} className="dialog" />
    </Div>
  );
}

const DialogStyled = styled(Dialog)`
  .wrapper {
    .image-wrapper{ 
      display: block;
      width: auto;
      width: 150px; 
    background: var(--light-surface-container-low);
      border: 1px solid var(--light-outline-variant);
      img{ 
        display: block;
        width: 150px; 
        padding: 16px; 
      }
    }
  }
`;
const Div = styled.div`
  .dialog {
  }
`;
