import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';

export default function FormDialog({ openForm, onSubmit }) {
    const [open, setOpen] = useState<boolean>(false)
    const [descriptionReview, setDescriptionReview] = useState()


    const handleConfirmation = (event: { target: { value: any; }; }) => {
        let description = event.target.value;
        setDescriptionReview(description);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        onSubmit(descriptionReview);
        handleClose();
    };

    useEffect(() => {
        setOpen(openForm)
    }, [])

    return (
        <Dialog open={open} onClose={handleClose}>
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Send</Button>
            </DialogActions>
        </Dialog>
    );
}
