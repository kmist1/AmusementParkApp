import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {RouteComponentProps, withRouter} from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Axios from "axios";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../../redux/IRootReducer";
import HelpMenu from "../../navBar/HelpMenu";



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

interface  State {
    logOutFlag: boolean
    changePage: boolean
    userName: string
}



function UserNav( {history}: RouteComponentProps) {
    const classes = useStyles();

    const email : string | undefined = useSelector<IRootReducer, string | undefined> (state => state.userReducer.email);

    const handleUserHomePageNavigation = () => {

        history.push('/userHome/userHomePage');
    };

    const handleHomePageNavigation = () => {

        history.push('/');
    };

    const handleProfilePageNavigation = () => {
        history.push('/userHome/profilePage');
    };

    const handleTicketPageNavigation = () => {
        history.push('/userHome/buyTickets');
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [values, setValues] = React.useState<State> ({

        logOutFlag: false,
        changePage: false,
        userName: ""
    });


    const open = Boolean(anchorEl);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    /************************************* For userAuth ************************************************/
    React.useEffect(() => {

        (async () => {

            try{
                const data = {email: email};
                console.log('userEmail: ',email);

                const response = await Axios.post('/userAuth', data);
                console.log('data when calling userHome', response);

                if (response.status === 200) {
                    setValues({...values,userName:response.data.firstName})
                }

            }catch (error) {
                console.error(error.message);
            }

        })();

    }, [values.userName]);

    /************************************* For Logout ************************************************/
    React.useEffect(() => {

        //console.log('flag-1');
        if(values.logOutFlag){
            //console.log('flag-2');
            (async () => {

                    try{
                        const data = {email: email}

                        console.log('reduxEmail', data);
                        const response = await Axios.delete('/logout', {data});
                        console.log(response);
                        // will delete the session based on count because
                        // even if session does not delete server is reponsing with status 200
                        if (response.data.deletedCount === 1){
                            handleHomePageNavigation();
                            alert('You are successfully logged out___' + email);
                        }

                    }catch (error) {
                        console.error(error.message);
                    }

            })();
        }

    }, [values.logOutFlag]);



    const handleUserLogout = () => {setValues({...values, logOutFlag: true})};



    return (

        <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Button color="inherit" >
                            Logo
                        </Button>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Button  onClick={handleUserHomePageNavigation} >UserHome</Button>
                        <Button  onClick={handleTicketPageNavigation} >BuyTickets</Button>

                        {/*<Button  onClick={handleRidePageNavigation} >Ride</Button>*/}
                        {/*<Button  onClick={handleTicketsEventsPageNavigation} >Tickets/Events</Button>*/}
                    </Typography>
                    {/*<HelpMenu>Help</HelpMenu>*/}

                    <HelpMenu>Help</HelpMenu>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <h5>{values.userName}</h5>
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfilePageNavigation}>Profile</MenuItem>
                            <MenuItem>My account</MenuItem>
                            <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

            </AppBar>
        </div>
    );
}

export default withRouter (UserNav);