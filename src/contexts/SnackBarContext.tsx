import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import React, { createContext, forwardRef, useContext } from 'react';

type SnackBarContextActions = {
    showSnackBar: (text: string, typeColor: AlertColor) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackBarContextProviderProps {
    children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
    children,
}) => {
    const [open, setOpen] = React.useState<boolean>();
    const [message, setMessage] = React.useState<string>('');
    const [typeColor, setTypeColor] = React.useState<AlertColor>('info');

    const showSnackBar = (text: string, color: AlertColor) => {
        setMessage(text);
        setTypeColor(color);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTypeColor(typeColor);
    };

    return (
        <SnackBarContext.Provider value={{ showSnackBar }}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity={typeColor}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </SnackBarContext.Provider>
    );
};

const useSnackBar = (): SnackBarContextActions => {
    const context = useContext(SnackBarContext);

    if (!context) {
        throw new Error('useSnackBar must be used within an SnackBarProvider');
    }

    return context;
};

export { SnackBarProvider, useSnackBar };