import React, { useState, useEffect } from 'react';
import Dialog from '../../commonComponents/dialogs';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextBox from '../../commonComponents/TextBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CustomButton from '../../commonComponents/button';
import List from '../../commonComponents/list';
import IconButton from '@material-ui/core/IconButton';
import DropDown from '../../commonComponents/dropdown';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IStoryIdList, IMemberList } from '../../../types/squad'



const useStyle = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    addSquadContainer: {
        maxWidth: 430,
        height: 590,
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
    createSprint(sprintData: object): void,
    isEdit: boolean,
    sprintData: any,
    sprintEditData: any
}

const AddSprint: React.FC<IAddSquad> = (props: IAddSquad) => {
    const classes = useStyle();
    const [storyIDList, setStoryIDList] = useState<IStoryIdList[]>([])
    const [storyID, setStoryID] = useState("")
    const [sprintName, setSprintName] = useState("")
    const [squadId, setSquadId] = useState("")
    const [sprintId, setSprintId] = useState()
    const [squadMember, setSquadMember] = useState([])
    const [selectedSquadMember, setSelectedSquadMember] = useState("")


    useEffect(() => {
        if (props.isEdit) {
            setSprintName(props.sprintEditData.sprintName)
            setStoryIDList(props.sprintEditData.storyIdList)
            setSprintId(props.sprintEditData.sprintId)
            setSquadId(props.sprintEditData.squadId)
        }
    }, [props.isEdit])

    useEffect(() => {
        if (props.sprintData && props.sprintData.length !== 0) {
            let member: any = []
            props.sprintData.memberList.map((squad: IMemberList) => {
                member.push(squad.name)
            })
            setSquadMember(member)
            setSquadId(props.sprintData.squadId)
        }


    }, [props.sprintData])


    const setSprintNames = (value: string) => {
        setSprintName(value)
    }
    const member = (value: string) => {
        setStoryID(value)
    }
    const addSprint = () => {
        let sprintData = {
            "squadId": squadId,
            "sprintId": props.isEdit ? sprintId : Math.floor(Math.random() * 100000),
            "sprintName": sprintName,
            "storyIdList": storyIDList
        }
        setStoryIDList([]);
        setSprintName("")
        props.createSprint(sprintData)
        props.closeDialog()
    }

    const deleteList = (delItem: IStoryIdList) => {
        let newMemberList = storyIDList.filter(item => item.storyId !== delItem.storyId)
        setStoryIDList([...newMemberList])

    }
    const addStoryId = () => {
        let memList = [...storyIDList];
        memList.push(
            {
                "name": selectedSquadMember,
                "storyId": storyID
            }
        )
        setStoryIDList([...memList])
        setStoryID("")
    }
    const memberValidation = () => {
        if (storyID !== "" && selectedSquadMember !=="") {
            return false
        }
        return true
    }
    const addValidation = () => {
        if (sprintName !== "" && storyIDList.length !== 0) {
            return false
        }
        return true
    }
    const closeDialog = () => {
        setStoryIDList([])
        setSprintName("")
        props.closeDialog()
    }
    const selectedMember = (member: string) => {
        setSelectedSquadMember(member)
    }
    const renderList = (itemList: Array<IStoryIdList>) => {
        return itemList.map((item: IStoryIdList,index) => {
            return <ListItem key={index}>
                <ListItemText
                    primary={item.storyId + "-" + item.name}
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
                        <h3>{props.isEdit ? "Edit Sprint" : "Add Sprint"}</h3>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.suqdName}>
                        <TextBox label="Sprint Name" enteredText={setSprintNames} defaultValue={sprintName} />
                    </Grid>

                    <Grid item xs={12} sm={12} className={classes.memberName}>
                        <DropDown label={"Member"} data={squadMember} selectedValue={selectedMember} />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.memberName}>
                        <div>
                            <TextBox label="Story/Bug Name" enteredText={member} defaultValue={storyID} />
                        </div>
                        <div className={classes.addIcon}>
                            <IconButton edge="end" aria-label="delete" disabled={memberValidation()}>
                                <AddBoxIcon onClick={addStoryId} />
                            </IconButton>
                        </div>
                    </Grid>

                    <div><p className={classes.para}>Story/Bug List</p></div>
                    <Grid item xs={12} sm={12} className={classes.memberList}>
                        <div className={classes.list}>
                            <List listItems={storyIDList} deleteList={deleteList}>
                                {renderList(storyIDList)}
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.actionBtns}>
                        <CustomButton label={props.isEdit ? "Update" : "Add"} buttonClicked={addSprint} disabled={addValidation()} />
                        <CustomButton label="Cancel" buttonClicked={closeDialog} />
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    )
}
export default AddSprint;