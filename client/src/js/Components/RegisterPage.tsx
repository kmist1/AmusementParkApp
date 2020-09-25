import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Email_Input from "./Email_Input";
import Password_Input from "./Password_Input";
import {RouteComponentProps, withRouter} from "react-router-dom";
import Axios from "axios";
import {useDispatch} from "react-redux";
import {changeUser} from "../../redux/actions/UserActions";


const backIMG = require('../Resources/registerBackIMG.jpg');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundImage:`url(${backIMG})`,
            backgroundSize:'1500px',
            display:'flex',
            flexDirection:'row',
        },

        parkLogoContainer: {

        },

        signInContainer: {
            display:'flex',
            flexDirection:'column',

        },

        pageContainer: {
            marginTop:'30px'
        },


        textFieldContainer: {
            display:'flex',
            flexWrap:'nowrap',
            flexDirection:'column',
            border:'2px solid black',
            borderRadius:'5px',
            width:'380px'

        },
    }),
);

interface  State {
    email: string,
    password: string,
    emailHelperText: string,
    passwordHelperText: string,
    loginFlag: boolean

}


function  RegisterPage({history}: RouteComponentProps) {

    const classes = useStyles();
    const dispatch = useDispatch();


    const [values, setValues] = React.useState<State>({
        email: '',
        password: '',
        emailHelperText:'',
        passwordHelperText:'',
        loginFlag: false
    });

    function validatorSignIn() {
        let isError: boolean = false;
        //console.log('flag-3');

        if (! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))){
            isError = true;
            //console.log('flag-4');
            values.emailHelperText = 'Please enter valid Email ID';
        } else if((values.password.length < 7)){
            isError = true;
            values.passwordHelperText = 'Please enter minimum 8 characters password ';
        }

        if(isError) {
            setValues({...values})
        }

        return isError;

    }

    React.useEffect(() => {

        //console.log('flag-1');
        if(values.loginFlag){
            //console.log('flag-2');
            (async () => {
                const err = validatorSignIn();

                if(!err){
                    try{
                        //console.log('flag-5');
                        const data = {email:values.email, passWord:values.password}
                        const response = await Axios.post('/login',data);
                        console.log("hello"+response.status)
                        if(response.status === 200){
                                console.log('user will go to homePage');
                                dispatch(changeUser(values.email));
                                handleUserHomeNavigation();
                        }


                    }catch (error) {
                        console.error(error.message);
                    }
                }

            })();
        }

    }, [values.loginFlag])



    const handleSignUpPageNavigation = () => {

        history.push('/signUp');
    };

    const handleUserHomeNavigation = () => {

        history.push('/userHome/userHomePage');
    };

    const handleLogin = () => {setValues({...values, loginFlag:true})};

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className={classes.pageContainer}>
                    <Typography component="div" style={{ height: '100vh' }} >
                        <div className={classes.parkLogoContainer}>
                            <a href={'http://localhost:3000/homePage'}>parkLogo</a>
                        </div>
                        <div className={classes.signInContainer}>
                            <div>SignIn</div>
                            <div className={classes.textFieldContainer}>
                                    <Email_Input values={values} setValues={setValues}/>
                                    <Password_Input

                                        values={values}
                                        setValues={setValues}
                                    />
                                <Button onClick={handleLogin}>Login</Button>
                            </div>

                            <div>
                                <div>Don't Have an Account?</div>
                                <div><Button onClick={handleSignUpPageNavigation}>Create New Account</Button></div>
                            </div>

                        </div>
                    </Typography>

                    <Typography>

                    </Typography>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default withRouter(RegisterPage);