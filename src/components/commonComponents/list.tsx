import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

export interface IList {
    listItems: Array<any>,
    deleteList(item: any): void,
    children:any
}

export default function InteractiveList(props: IList) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <div className={classes.demo}>
                        <List dense={true}>
                            {props.children}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
