import  React, {useState} from 'react';
import Button from '@mui/material/Button';

import SyncGoogleReviewsForm from './SyncGoogleReviewsForm/SyncGoogleReviewsForm';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Alert from '@mui/material/Alert';
const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  className: string
}

function SimpleDialog({open, selectedValue, onClose, className}: SimpleDialogProps) {
  const [errorText, setErrorText] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

const handleFormSubmission = async (event:React.FormEvent<HTMLFormElement> )=> { 
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formJson = Object.fromEntries((formData as any).entries());
  const mapURL = formJson.url;
  setIsLoading(true);
  try{ 
    const result = await axios.post('/api/reviews/sync-google-reviews', {mapURL: mapURL});
    console.log(result)
    if(result.data.success) { 
      setIsSuccess(true);
      setIsLoading(false);
      handleClose();
    }
    else{ 
      setIsSuccess(false);
      setIsLoading(false);
    }

  }
  catch (error) {
    console.log(error);
    setIsSuccess(false);
    setIsLoading(false);
    if (axios.isAxiosError(error)) {
      setErrorText(`${error.response?.data.message} Please enter the correct url` || "An error occurred");
    } else if (error instanceof Error) {
      setErrorText(error.message);
    } else {
      setErrorText("An unknown error occurred");
    }
  
  }
 
}



  return (
    <DialogStyled
    open={open}
    onClose={handleClose}
    PaperProps={{
      component: 'form',
      onSubmit: handleFormSubmission
    }}
  >
    <div className="wrapper">

   
    <DialogTitle>Sync Google Reviews</DialogTitle>
    <DialogContent>
      <DialogContentText>
       Please find the location map url and enter it below. Our system will sync all good reviews from Google Business Profile. 
      </DialogContentText>
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
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant='text'>Cancel</Button>
      <Button type="submit" variant='contained' disabled={isLoading ? true : false}>{isLoading ? "Syncing..." : "Sync Now"}</Button>
 
    </DialogActions>
    <DialogContent>  {(!isSuccess && errorText) &&
           <Alert severity={"error"}>{errorText}</Alert>
     }</DialogContent>
  
    </div>
  </DialogStyled>
  )
}

export default function SyncGoogleReview(){ 
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Div>
      <Button variant="contained" onClick={handleClickOpen}>
       Sync Google Reviews
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        className="dialog"
      />
    </Div>
  );
}

const DialogStyled = styled(Dialog)`
.wrapper{ 
}
`
const Div = styled.div`
.dialog{

}
`