import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: '90%'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
export interface IDropdown {
    label: string,
    data: Array<any>,
    selectedValue(value: string): void
}

export default function SimpleSelect(props: IDropdown) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log(event.target.value)
        setAge(event.target.value as string);
        props.selectedValue(event.target.value as string)
    };

    const renderMenu = () => {
        // props.data.map((item: any) => {
        //     return <MenuItem value={item.value}>{item.name}</MenuItem>
        // })
        return props.data.map((item: any) => {
            return <MenuItem value={item}>{item}</MenuItem>
        })
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label={props.label}
                >
                    {renderMenu()}
                </Select>
            </FormControl>
        </div>
    );
}
