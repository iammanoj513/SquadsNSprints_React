import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(1),
        },
        textField: {
            width: '25ch',
        },
        textHeight: {
            '& input': {
                height: 1
            }
        }
    }),
);

export interface ISearch {
    searchresult(searchResult: string): void,
    placeHolder:string
}

const SearchTextBox: React.FC<ISearch> = (props: ISearch) => {
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.searchresult(event.target.value)
    }

    return (
        <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
            <OutlinedInput
                id="outlined-adornment-weight"
                onChange={handleChange}
                aria-describedby="standard-weight-helper-text"
                placeholder={props.placeHolder}
                className={classes.textHeight}
            />
        </FormControl>
    )
}

export default SearchTextBox;