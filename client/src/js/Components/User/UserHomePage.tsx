import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const backImg = require('./UserResourse/userHomeIng.jpg');

interface IUserProps {
    userName: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        root: {
            backgroundImage:`url(${backImg})`,
            backgroundSize:'1500px',
            display:'flex',
            height: theme.spacing(100),
            flexDirection:'row',
        },

    }),
);
export default function  UserHomePage(props: IUserProps) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3 style={{color: "white"}}>welcome {props.userName}</h3>
        </div>
    );

}
