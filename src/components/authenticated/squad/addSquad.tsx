import React, { useState, useEffect } from 'react';
import Dialog from '../../commonComponents/dialogs';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextBox from '../../commonComponents/TextBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CustomButton from '../../commonComponents/button';
import List from '../../commonComponents/list';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ISquad, IMemberList } from '../../../types/squad'


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    addSquadContainer: {
        maxWidth: 400,
        height: 510,
        padding: '0px 10px'
    },
    suqdName: {
    },
    suqdTitle: {
        borderBottom: '1px solid #00000047'
    },
    addIcon: {
        position: 'absolute',
        top: '24%',
        left: '80%',
        cursor: 'pointer'
    },
    memberName: {
        position: "relative"
    },
    memberList: {
        paddingTop: '0px!important',
        height: 170,
        overflow: 'auto'
    },
    para: {
        margin: '0px 0px 0px 16px'
    },
    actionBtns: {
        display: 'flex',
        flexDirection: 'row-reverse',
        borderTop: '1px solid #00000047'
    },
    list: {
        paddingRight: 30
    }

}));

export interface IAddSquad {
    open: boolean,
    closeDialog(): void,
    createSquad(squadData: ISquad): void,
    isEdit: boolean,
    squadData: any
}

const AddSquad: React.FC<IAddSquad> = (props: IAddSquad) => {
    const classes = useStyle();
    const [memberList, setMemberList] = useState<IMemberList[]>([])
    const [memberName, setMemberName] = useState("")
    const [squadName, setsquadName] = useState("")
    const [squadId, setSquadId] = useState("")


    useEffect(() => {
        if (props.isEdit) {
            setsquadName(props.squadData.squadName)
            setMemberList(props.squadData.memberList)
            setSquadId(props.squadData.squadId)
        }
    }, [props.isEdit])


    const setSquadName = (value: string) => {
        setsquadName(value)
    }
    const member = (value: string) => {
        setMemberName(value)
    }
    const addSquad = () => {
        let suadData = {
            "squadId": props.isEdit ? squadId : Math.floor(Math.random() * 100000),
            "squadName": squadName,
            "memberList": memberList
        }
        setMemberList([]);
        setsquadName("")
        props.createSquad(suadData)
        props.closeDialog()
    }

    const deleteList = (delItem: IMemberList) => {
        let newMemberList = memberList.filter(item => item.name !== delItem.name)
        setMemberList([...newMemberList])

    }
    const addMember = () => {
        let memList = [...memberList];
        memList.push({ "name": memberName })
        setMemberList([...memList])
        setMemberName("")
    }
    const memberValidation = () => {
        if (memberName !== "") {
            return false
        }
        return true
    }
    const addValidation = () => {
        if (squadName !== "" && memberList.length !== 0) {
            return false
        }
        return true
    }
    const closeDialog = () => {
        setMemberList([])
        setsquadName("")
        props.closeDialog()
    }

    const renderList = (itemList: Array<IMemberList>) => {
        return itemList.map((item: IMemberList,index) => {
            return <ListItem key={index}>
                <ListItemText
                    primary={item.name}
                />
                <ListItemSecondaryAction onClick={() => deleteList(item)}>
                    <IconButton edge="end" aria-label="delete">
                        <HighlightOffIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        })
    }
    return (
        <Dialog open={props.open} closeDialog={closeDialog}>
            <div className={classes.addSquadContainer}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12} sm={12} className={classes.suqdTitle}>
                        <h3>{props.isEdit ? "Edit Squad" : "Add Squad"}</h3>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.suqdName}>
                        <TextBox label="Squad Name" enteredText={setSquadName} defaultValue={squadName} />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.memberName}>
                        <div>
                            <TextBox label="Member Name" enteredText={member} defaultValue={memberName} />
                        </div>
                        <div className={classes.addIcon}>
                            <IconButton edge="end" aria-label="delete" disabled={memberValidation()}>
                                <AddBoxIcon onClick={addMember} />
                            </IconButton>
                        </div>
                    </Grid>
                    <div><p className={classes.para}>Member List</p></div>
                    <Grid item xs={12} sm={12} className={classes.memberList}>
                        <div className={classes.list}>
                            <List listItems={memberList} deleteList={deleteList}>
                                {renderList(memberList)}
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.actionBtns}>
                        <CustomButton label={props.isEdit ? "Update" : "Add"} buttonClicked={addSquad} disabled={addValidation()} />
                        <CustomButton label="Cancel" buttonClicked={closeDialog} />
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    )
}
export default AddSquad;