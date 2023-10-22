import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useSnackBar } from 'src/contexts/SnackBarContext';
import { AlertColor } from '@mui/material/Alert';

export default function FormDialog({ openForm, onSubmit, closeForm }) {
    const [open, setOpen] = useState<boolean>(false)
    const [descriptionReview, setDescriptionReview] = useState<string>('') || undefined
    
    const minChar = 30;

    const { showSnackBar } = useSnackBar();
    const handleSnackbar = (message: string, color: AlertColor) => {
      showSnackBar(message, color)
    };

    const handleConfirmation = (event: { target: { value: any; }; }) => {
        let description = event.target.value;
        if (event.target.value.toString().length >= minChar) {
            setDescriptionReview(description);
        }
    }

    const handleClose = () => {
        setOpen(closeForm);
    };

    const handleSubmit = () => {
        console.log('descriptionReview.length', descriptionReview.length );
        if (descriptionReview.length <= minChar){
            handleSnackbar('Please provide more information about the task review description. Minimum characters: 30', 'error');
        }else{
            onSubmit(descriptionReview);
            handleClose();
        }
    };

    useEffect(() => {
        setOpen(openForm)
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Review Description</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add your Task Description
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Well Done ! I like that approach. We should make that way. After that, increase the font size to 32. Any Help, contact-me on discord"
                    fullWidth
                    variant="standard"
                    onChange={(event) => (handleConfirmation(event))}
                    inputProps={{ minLength: "30" }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Send</Button>
            </DialogActions>
        </Dialog>
    );
}
