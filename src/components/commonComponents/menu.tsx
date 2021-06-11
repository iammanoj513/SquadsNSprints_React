import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CustomButton from './button';

const useStyle = makeStyles((theme: Theme) => ({
    linkDecoration: {
        textDecoration: 'none'
    },

}))

export interface IMenu {
    activeMenu: string
}

const Menu: React.FC<IMenu> = (props: IMenu) => {
    const classes = useStyle();
    const menuButton = () => {}

    return (
        <>
            <Link to='/squads' className={classes.linkDecoration}> <CustomButton label="Squads" isActive={props.activeMenu === "SQUADS" ? true : false} buttonClicked={menuButton} /></Link>
            <Link to='/sprints' className={classes.linkDecoration}>  <CustomButton label="Sprints" isActive={props.activeMenu === "SPRINTS" ? true : false} buttonClicked={menuButton} /></Link>
        </>
    )
}

export default Menu