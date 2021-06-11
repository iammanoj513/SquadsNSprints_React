import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import AddSprints from './addSprint';
import ViewSprints from './viewSprint';
import { useSelector, useDispatch } from 'react-redux';
import { addSprint } from '../../../actions/sprint/addSprint';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Search from '../../commonComponents/searchTextBox';
import Menu from '../../commonComponents/menu';
import { ISquad, Isprint } from '../../../types/squad'


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


const Sprint: React.FC = () => {
    const sprintData = useSelector((state: any) => state.sprintData);
    const squadData = useSelector((state: any) => state.squadData);

    const dispatch = useDispatch();
    const classes = useStyle();
    const [addSprints, setAddSprints] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editSprintData, setEditSprintData] = useState<ISquad>();
    const [squads, setSquads] = useState<ISquad[]>([]);
    const [squadsCopy, setSquadsCopy] = useState<ISquad[]>([])
    const [spritEdit, setSprintEdit] = useState<Isprint>()

    useEffect(() => {
        setSquadsCopy(squadData)
        setSquads(squadData)
    }, [sprintData])

    const closeSquadDialog = () => {
        setIsEdit(false)
        setAddSprints(false)
    }
    const createSprint = (sprintData: Isprint) => {
        let squadList = [...squads];
        if (isEdit) {
            squadList.map((sqData) => {
                if (sqData.squadId === sprintData.squadId) {
                    sqData.sprint && sqData.sprint.map((sprint) => {
                        if (sprint.sprintId === sprintData.sprintId) {
                            sprint["sprintName"] = sprintData.sprintName
                            sprint["storyIdList"] = sprintData.storyIdList
                        }

                    })
                }
            })
        } else {
            squadList.map((sqData) => {
                if (sqData.squadId === sprintData.squadId) {
                    if (sqData['sprint'] === undefined) {
                        sqData['sprint'] = [sprintData]
                    } else {
                        sqData['sprint'].push(sprintData)
                    }
                }
            })
        }
        dispatch(addSprint(squadList))
        setIsEdit(false)
    }
    const editClick = (squad: ISquad, sprint: Isprint) => {
        setAddSprints(true)
        setIsEdit(true)
        setEditSprintData(squad)
        setSprintEdit(sprint)
    }

    const searchresult = (searchKey: string) => {
        let searchResult = squadsCopy.filter((item: ISquad) => (item.squadName).toLowerCase().includes((searchKey).toLowerCase()))
        setSquads(searchResult)
    }
    const addClick = (squad: ISquad) => {
        setAddSprints(true)
        setEditSprintData(squad)
        console.log(squad)
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12} sm={12} className={classes.menuButtons}>
                <Menu activeMenu={"SPRINTS"} />
            </Grid>
            <Grid item xs={12} sm={12} className={classes.subMenuButtons}>
                <div className={classes.subMenuBtn}>
                    <Search placeHolder={"Search Sprint"} searchresult={searchresult} />
                </div>
            </Grid>
            <AddSprints open={addSprints} closeDialog={closeSquadDialog} createSprint={createSprint} isEdit={isEdit} sprintData={editSprintData} sprintEditData={spritEdit} />
            {
                squads.length !== 0 ?
                    <ViewSprints squads={squads} editClick={editClick} addClick={addClick} />
                    :
                    <Grid item xs={12} sm={12}>
                        <div>Sprint Not Found</div>
                    </Grid>

            }
        </Grid >
    )
}

export default Sprint;