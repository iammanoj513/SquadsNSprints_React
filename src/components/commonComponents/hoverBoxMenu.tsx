import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles({
    actions: {
        position: 'absolute',
        background: 'rgba(152, 134, 134, 0.5)',
        height: 30,
        width: '100%'
    },
    svg: {
        float: 'right',
        '& svg': {
            '& path': {
                fill: '#3f51b5'
            }
        }
    }
});

export interface IHoverBox {
    editClick: () => void,
    deleteClick: () => void
    addClick: () => void,
    isAddIconRequired: boolean,
    isDeleteIconRequired: boolean,
    isEditIconRequired: boolean

}

const HoverBoxMenu: React.FC<IHoverBox> = (props: IHoverBox) => {
    const classes = useStyles();
    const editClick = () => {
        props.editClick()
    }

    const deleteClick = () => {
        props.deleteClick()
    }

    const addClick = () => {
        props.addClick()
    }

    return (
        <div className={classes.actions}>
            {props.isDeleteIconRequired &&
                <Tooltip title="Delete">
                    <div className={classes.svg}>
                        <DeleteForeverIcon onClick={deleteClick} />
                    </div>
                </Tooltip>
            }
            {
                props.isEditIconRequired &&
                <Tooltip title="Edit">
                    <div className={classes.svg}>
                        <EditIcon onClick={editClick} />
                    </div>
                </Tooltip>
            }
            {
                props.isAddIconRequired &&
                <Tooltip title="Add">
                    <div className={classes.svg}>
                        <AddBoxIcon onClick={addClick} />
                    </div>
                </Tooltip>
            }

        </div >
    )
}

export default HoverBoxMenu