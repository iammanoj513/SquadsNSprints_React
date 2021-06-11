import React from 'react';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}


export interface IDialog {
    open: boolean,
    children: any,
    closeDialog():void
}


export default function CustomizedDialogs(props: IDialog) {
    
    const handleClose = () => {
        props.closeDialog()
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            {props.children}
        </Dialog>
    );
}
