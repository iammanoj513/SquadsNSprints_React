import React from 'react';
import Box from '../../commonComponents/box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { ISquad, Isprint } from '../../../types/squad'


const useStyles = makeStyles({
    pos: {
        marginBottom: 12,
    },
    squadHeader: {
        borderBottom: "1px solid"
    },
    li: {
        listStyleType: 'none'
    },
    sprintTitle: {
        display: 'flex',
        '& h3': {
            margin: 8
        },
        '& svg': {
            margin: 8
        }
    }
});

export interface IView {
    squads: Array<ISquad>,
    editClick(squad: ISquad, sprint: Isprint): void,
    addClick(squad: ISquad): void
}

const ViewSprint: React.FC<IView> = (props: IView) => {
    const classes = useStyles();

    const renderSprintData = (squads: ISquad) => {
        return (
            <>
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.squadHeader}>
                        {squads.squadName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {
                            squads && squads.sprint && squads.sprint.map((sprint: any) => {
                                return <div>
                                    <div className={classes.sprintTitle}><h3>{sprint.sprintName}</h3><EditIcon onClick={() => editClick(squads, sprint)} /></div>
                                    {sprint.storyIdList && sprint.storyIdList.map((stroy: any) => {
                                        return <li key={stroy.name} className={classes.li}>BugId/StoryID-{stroy.storyId}---{stroy.name}</li>
                                    })}
                                </div>
                            })
                        }

                    </Typography>
                </CardContent>
            </>)
    }
    const editClick = (squads: ISquad, sprint: Isprint) => {
        props.editClick(squads, sprint)
    }
    // const deleteClick = (sprint: Object) => {
    //     props.deleteClick(sprint)
    // }
    const addClick = (squads: ISquad) => {
        props.addClick(squads)
    }

    return (
        <>
            {
                props.squads && props.squads.map((squads, index) => {
                    return <Box keyValue={index} key={index} isDeleteIconRequired={false} isEditIconRequired={false} isAddIconRequired={true} addClick={() => addClick(squads)}>
                        {renderSprintData(squads)}
                    </Box>
                })
            }
        </>
    )

}
export default ViewSprint;