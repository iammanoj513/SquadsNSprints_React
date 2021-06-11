import React from 'react';
import Box from '../../commonComponents/box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ISquad, IMemberList } from '../../../types/squad'


const useStyles = makeStyles({
    pos: {
        marginBottom: 12,
    },
    squadHeader: {
        borderBottom: "1px solid"
    },
    li: {
        listStyleType: 'none'
    }
});

export interface IView {
    squads: Array<ISquad>,
    editClick(squad: ISquad): void,
    deleteClick(squad: ISquad): void
}

const ViewSquads: React.FC<IView> = (props: IView) => {
    const classes = useStyles();

    const renderSquadData = (squad: ISquad) => {
        return (
            <>
                <CardContent>
                    <Typography variant="h5" component="h2" className={classes.squadHeader}>
                        {squad.squadName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {squad && squad.memberList.map((member: IMemberList) => {
                            return <li key={member.name} className={classes.li}>{member.name}</li>
                        })}
                    </Typography>
                </CardContent>
            </>)
    }
    const editClick = (squad: ISquad) => {
        props.editClick(squad)
    }
    const deleteClick = (squad: ISquad) => {
        props.deleteClick(squad)
    }


    return (
        <>
            {
                props.squads && props.squads.map((squad, index) => {
                    return <Box keyValue={index} key={index} isDeleteIconRequired={true} isEditIconRequired={true} isAddIconRequired={false} editClick={() => editClick(squad)} deleteClick={() => deleteClick(squad)}>
                        {renderSquadData(squad)}
                    </Box>
                })
            }
        </>
    )

}
export default ViewSquads;