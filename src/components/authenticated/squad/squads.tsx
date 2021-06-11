import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../commonComponents/button';
import AddSquads from './addSquad';
import ViewSquads from './viewSquads';
import { useSelector, useDispatch } from 'react-redux';
import { addSquad } from '../../../actions/squad/addSquad';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Search from '../../commonComponents/searchTextBox';
import Dialog from '../../commonComponents/dialogs';
import Menu from '../../commonComponents/menu';
import { ISquad } from '../../../types/squad'


const useStyle = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    centerDiv: {
        position: 'absolute' as 'absolute',
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid",
        padding: "30px",
        boxShadow: "6px -6px 9px 2px #a5a0a0"
    },
    menuButtons: {
        display: 'flex',
        borderBottom: '2px solid black',
        padding: 20
    },
    subMenuButtons: {
        borderBottom: '2px solid black',
    },
    subMenuBtn: {
        float: 'right',
        display: 'flex'
    },
    content: {
        padding: '0px 20px 20px 20px'
    },
    navBar: {
        display: 'flex',
        marginTop: 20
    },
    headerMargin: {
        margin: '0px 0px 0px 2px',
    },
    backIcon: {
        cursor: 'pointer'
    },
    linkDecoration: {
        textDecoration: 'none'
    },
    deleteButtons: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: 39
    },
    deleteDialog: {
        padding: 20
    }
}));

const Squad: React.FC = () => {
    const squadData = useSelector((state: any) => state.squadData);
    const dispatch = useDispatch();
    const classes = useStyle();
    const [addButton, setaddButton] = useState("New Squad");
    const [addSquads, setAddSquads] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editSquadData, setEditSquadData] = useState<ISquad>();
    const [squads, setSquads] = useState<ISquad[]>([])
    const [squadCopy, setSquadCopy] = useState<ISquad[]>([])
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteData, setDeleteData] = useState<any>()
    useEffect(() => {
        console.log("hello")
    }, [squadData])


    useEffect(() => {
        setSquads(squadData)
        setSquadCopy(squadData)
    }, [squadData])

    const createNew = () => {
        setIsEdit(false)
        setAddSquads(true)
    }

    const closeSquadDialog = () => {
        setIsEdit(false)
        setAddSquads(false)
    }
    const createSquad = (squadData: ISquad) => {
        let squadList = [...squads];
        if (isEdit) {
            squadList.map((sqData) => {
                if (sqData.squadId === squadData.squadId) {
                    sqData['squadName'] = squadData.squadName
                    sqData['memberList'] = squadData.memberList
                }
            })
        } else {
            squadList.push(squadData)
        }
        dispatch(addSquad(squadList))
        setIsEdit(false)
    }
    const editClick = (squad: ISquad) => {
        setAddSquads(true)
        setIsEdit(true)
        setEditSquadData(squad)
    }

    const searchresult = (searchKey: string) => {
        let searchResult = squadCopy.filter((item: ISquad) => (item.squadName).toLowerCase().includes((searchKey).toLowerCase()))
        setSquads(searchResult)
    }

    const closeDialog = () => {

    }
    const deleteClick = (squad: ISquad) => {
        setDeleteData(squad)
        setDeleteWarning(true)
    }
    const closeDeleteDialog = () => {
        setDeleteWarning(false)
    }

    const deleteSquad = () => {
        let squadData = squads.filter((squad: ISquad) => squad.squadId !== deleteData.squadId);
        setSquads(squadData)
        dispatch(addSquad(squadData))
        setDeleteWarning(false)
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} sm={12} className={classes.menuButtons}>
                <Menu activeMenu={"SQUADS"} />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subMenuButtons}>
                <div className={classes.subMenuBtn}>
                    <Search placeHolder={"Search Squad"} searchresult={searchresult} />
                    <CustomButton label={addButton} buttonClicked={createNew} />
                </div>
            </Grid>
            <AddSquads open={addSquads} closeDialog={closeSquadDialog} createSquad={createSquad} isEdit={isEdit} squadData={editSquadData} />
            {
                squads.length !== 0 ?
                    <ViewSquads squads={squads} editClick={editClick} deleteClick={deleteClick} />
                    :
                    <Grid item xs={12} sm={12}>
                        <div>Squads Not Found</div>
                    </Grid>

            }
            <Dialog open={deleteWarning} closeDialog={closeDialog}>
                <div className={classes.deleteDialog}>
                    <div>Are You Sure You Want To Delete???</div>
                    <div className={classes.deleteButtons}>
                        <CustomButton label="ok" buttonClicked={deleteSquad} />
                        <CustomButton label="Cancel" buttonClicked={closeDeleteDialog} />
                    </div>
                </div>
            </Dialog>
        </Grid >
    )
}

export default Squad;