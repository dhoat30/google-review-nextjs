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

  const handleClose = () => {
    onClose(selectedValue);
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

      console.log(result);
      if (result.data.success) {
        setIsSuccess(true);
        setIsLoading(false);
        handleClose();
      } else {
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
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
              onChange={(event) => console.log(event.target.files)}
              multiple
              name="image"
              id="image"
              required
            />
          </Button>
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
  }
`;
const Div = styled.div`
  .dialog {
  }
`;
