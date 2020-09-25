import React from 'react';
import {useSelector} from "react-redux";
import {IRootReducer} from "../../../redux/IRootReducer";
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";
import Button from "@material-ui/core/Button";
const regTicket = require('./UserResourse/regTicket.jpeg');
const yearlyPass = require('./UserResourse/yearlyPass.jpg');


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root1: {
            maxWidth: 345,
        },

        root: {
            backgroundColor:'#e1e8f2',
            display:'flex',
            height: theme.spacing(100),
            flexDirection:'row',
        },

        cardContainer: {
            marginTop: theme.spacing(5),
            display: 'flex',
            flexDirection: 'row',
            flexWrap:'nowrap',
        },

        card2: {
            marginLeft: theme.spacing(3)
        },

        typography: {
            padding: theme.spacing(2),
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },

    }),
);

//****************************************************************************************************//

interface  State {
    userName: string,
    startDate: string,
    endDate: string,
    numPeople: string,
    whichPark: string,
    ticketFlag: boolean

}

//****************************************************************************************************//


function  BuyTicketsPage({history}: RouteComponentProps) {
    const email : string | undefined = useSelector<IRootReducer, string | undefined> (state => state.userReducer.email);

    //****************************************************************************************************//

    const [values, setValues] = React.useState<State>({

        userName: '',
        startDate: '',
        endDate: '',
        numPeople:'',
        whichPark:'',
        ticketFlag: false
    });

    React.useEffect(() => {

        console.log('flag-1');
        if(values.ticketFlag){
            console.log('flag-2');
            (async () => {

                try{
                    console.log('flag-5');
                    console.log(values.startDate);
                    const data = {email:email, startDate:values.startDate, endDate:values.endDate, numPeople: values.numPeople, whichPark: values.whichPark}
                    const response = await Axios.post('/buyTickets',data);
                    if(response.status === 200){
                        console.log('You Successfully baught ticket');
                        alert('You Successfully bought ticket__' + values.userName);

                    } else if (response.status === 204){
                        alert('You already bought this ticket__' + values.userName);
                        console.log("You already have this");
                    }


                }catch (error) {
                    console.error(error.message);
                }
            })();
        }

    }, [values.ticketFlag])


    const handleStartDateChange = (event: any) => {
        return setValues({...values,startDate: event.target.value})
    };

    const handleEndDateChange = (event: any) => {
        return setValues({...values,endDate: event.target.value})
    };

    const handleNumPeopleChange = (event: any) => {
        return setValues({...values,numPeople: event.target.value})
    };

    const handleWhichParkChange = (event: any) => {
        return setValues({...values,whichPark: event.target.value})
    };

    const handleTicketFlagChange = () => {
        return setValues({...values,ticketFlag: true})
    };


    //****************************************************************************************************//





    const classes = useStyles();

    React.useEffect(() => {

        (async () => {

            try{
                const data = {email: email};
                console.log('userEmail: ',email);

                const response = await Axios.post('/userAuth', data);
                console.log('data when calling buyTickets', response);

                if(response.status === 200) {
                    console.log("user authenticated");
                    setValues({...values,userName:response.data.firstName})
                }
                else if(response.status == 400){
                    console.log("user not authenticated");
                    handleHomePageNavigation();

                }else {
                    console.log("not getting response");
                }

            }catch (error) {
                console.error(error.message);
            }

        })();

    }, [values.userName]);

    const handleHomePageNavigation = () => {

        history.push('/');
    };

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Container >
                    <Typography>
                        <h3>Hi {values.userName}, just let us know if you are having problem buying pass / tickets</h3>
                        <div className={classes.cardContainer}>
                            <div className={classes.root1}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component= 'img'
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={regTicket}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Regular Pass
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                $30 /day
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <PopupState variant="popper" popupId="demo-popup-popper">
                                            {(popupState) => (
                                                <div>
                                                    <Button variant="contained" color="primary" {...bindToggle(popupState)}>
                                                        Buy
                                                    </Button>
                                                    <Popper {...bindPopper(popupState)} transition>
                                                        {({ TransitionProps }) => (
                                                            <Fade {...TransitionProps} timeout={350}>
                                                                <Paper>
                                                                    <Typography className={classes.typography}>
                                                                        <TextField
                                                                            id="date"
                                                                            label="Start Date"
                                                                            type="date"
                                                                            value={values.startDate}
                                                                            onChange = {handleStartDateChange}
                                                                            defaultValue="2017-05-24"
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            id="date"
                                                                            label="End Date"
                                                                            type="date"
                                                                            value={values.endDate}
                                                                            onChange = {handleEndDateChange}
                                                                            defaultValue="2017-05-24"
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                        />
                                                                        <TextField
                                                                            id="standard-basic"
                                                                            label="No. of People"
                                                                            value={values.numPeople}
                                                                            onChange = {handleNumPeopleChange}

                                                                        />
                                                                        <TextField
                                                                            id="standard-basic"
                                                                            label="Location"
                                                                            value={values.whichPark}
                                                                            onChange = {handleWhichParkChange}
                                                                        />
                                                                        <Button variant="contained" color="primary"  onClick={handleTicketFlagChange}>
                                                                            Buy
                                                                        </Button>
                                                                    </Typography>
                                                                </Paper>
                                                            </Fade>
                                                        )}
                                                    </Popper>
                                                </div>
                                            )}
                                        </PopupState>
                                    </CardActions>
                                </Card>
                            </div>

                            <div className={classes.card2}>
                                <Card className={classes.root1}>
                                    <CardActionArea>
                                        <CardMedia
                                            component= 'img'
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={yearlyPass}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Yearly Pass
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                $200 Each person
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Buy
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>

                        </div>
                    </Typography>
                </Container>
            </React.Fragment>
        </div>

    );

}

export default withRouter(BuyTicketsPage);
