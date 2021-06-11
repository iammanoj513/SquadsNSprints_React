import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import HoverBoxMenu from '../commonComponents/hoverBoxMenu';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
        cursor: 'pointer',
        position: 'relative'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actions: {
        position: 'absolute',
        background: 'rgba(152, 134, 134, 0.5)',
        width: 275,
        height: 30,
    },
    svg: {
        float: 'right',
        '& svg': {
            '& path': {
                fill: '#3f51b5'
            }
        }
    },
    squadHeader: {
        borderBottom: "1px solid"
    }
});

export interface IBox {
    keyValue: any;
    isAddIconRequired: boolean;
    isDeleteIconRequired: boolean;
    isEditIconRequired: boolean
    editClick?(): void
    deleteClick?(): void
    addClick?(): void,
    children: any
}


export default function OutlinedCard(props: IBox) {
    const classes = useStyles();
    const [menuItem, setMenuItems] = useState(false)

    const toggleMenus = () => {
        setMenuItems(!menuItem)
    }

    const editClick = () => {
        props.editClick && props.editClick()
    }

    const deleteClick = () => {
        props.deleteClick && props.deleteClick()
    }
    const addClick = () => {
        props.addClick && props.addClick()
    }


    return (
        <Card className={classes.root} variant="outlined" key={props.keyValue} onMouseEnter={toggleMenus} onMouseLeave={toggleMenus}>
            {menuItem &&
                <HoverBoxMenu editClick={editClick} deleteClick={deleteClick} addClick={addClick} isAddIconRequired={props.isAddIconRequired} isDeleteIconRequired={props.isDeleteIconRequired} isEditIconRequired={props.isEditIconRequired} />
            }
            {props.children}
        </Card>
    );
}