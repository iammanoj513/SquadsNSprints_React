import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%'
            },
        },
    }),
);

export interface textBoxProps {
    label: String,
    isNumber?: boolean,
    defaultValue?:String|Number
    enteredText(value: string): void
}

const isNumber = '^[0-9]*$'


export default function BasicTextFields(props: textBoxProps) {
    const classes = useStyles();
    const [value, setvalue] = useState("");
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");

    let validateNumber = (value: string) => {
        let isValid = value.match(isNumber);
        if (isValid) {
            setvalue(value)
            setError(false)
            setHelperText("")
            props.enteredText(value)
        } else {
            setvalue(value)
            setError(true)
            setHelperText("Enter Only Number")
        }
    }

    let keyPress = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (props.isNumber) {
            validateNumber(event.target.value)
        } else {
            setvalue(event.target.value)
            setError(false)
            setHelperText("")
            props.enteredText(event.target.value)
        }

    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField error={error} id="standard-basic" variant="outlined" value={props.defaultValue === undefined ? value : props.defaultValue} label={props.label} helperText={helperText} onChange={keyPress} />
        </form>
    );
}