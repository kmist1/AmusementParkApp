import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {RouteComponentProps, withRouter} from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nav: {
            display:'inline-flex',
            backgroundColor:'#b2acbb',
        },

        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);


function NavBar({history}: RouteComponentProps) {
    const classes = useStyles();


    const handleHomePageNavigation = () => {

        history.push('/');
    };


    const handleRegisterPagePageNavigation = () => {

        history.push('/Register');
    };



    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Button color="inherit" >

                        </Button>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Button  onClick={handleHomePageNavigation} >Home</Button>
                        {/*<Button  onClick={handleRidePageNavigation} >Ride</Button>*/}
                        {/*<Button  onClick={handleTicketsEventsPageNavigation} >Tickets/Events</Button>*/}
                    </Typography>
                    <Button onClick={handleRegisterPagePageNavigation}>Register / Login</Button>
                </Toolbar>

            </AppBar>
        </div>
);
}

export default withRouter (NavBar);