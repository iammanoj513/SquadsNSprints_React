import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    activeButton: {
      backgroundColor: "green",
      '&:hover': {
        backgroundColor: "green",
      }
    }
  },
  ),
);



export interface IButton {
  label: String,
  buttonClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
  isActive?: boolean,
  disabled?: boolean
}
export default function ContainedButtons(props: IButton) {
  const classes = useStyles();
  
  let buttonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.buttonClicked(event)
  }
  return (
    <div className={classes.root}>
      <Button variant="contained" className={props.isActive ? classes.activeButton : ""} color="primary" disabled={props.disabled} onClick={buttonClick}>
        {props.label}
      </Button>
    </div>
  );
}