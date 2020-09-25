import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Email_Input from "./Email_Input";
import Password_Input from "./Password_Input";
import Axios from "axios";
import {RouteComponentProps, withRouter} from "react-router-dom";



const backIMG = require('../Resources/registerBackIMG.jpg');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundImage:`url(${backIMG})`,
            backgroundSize:'1500px',
            display:'flex',
            flexDirection:'row',
        },

        pageContainer: {
            marginTop:'30px',
            display:'flex',
            flexDirection:'row',
            flexWrap: 'nowrap',
            justifyContent:'space-between'

        },

        signUpContainer: {
            display:'flex',
            flexDirection:'column',
            border:'2px solid black',
            borderRadius:'5px'
        },

        signInContainer: {
            flexDirection:'row',
        },

        textFieldContainer: {
            display:'flex',
            flexWrap:'nowrap',
            flexDirection:'column',
            border:'2px solid black',
            borderRadius:'5px',
            width:'380px'

        },

        textFieldContainer1: {
            marginTop:'10px',
            display:'flex',
            flexWrap:'nowrap',

        },
    }),
);

interface State {
    email: string,
    password: string,
    showPassword: boolean,
    firstName: string,
    lastName: string,
    firstNameHelperText: string,
    lastNameHelperText: string,
    emailHelperText: string,
    passwordHelperText: string,
    submitFlag: boolean
}


function  SignUpForm({history}: RouteComponentProps) {


    /********************************* Initiate States *************************************/
    const classes = useStyles();

    const [values, setValues] = React.useState<State>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        showPassword:false,
        firstNameHelperText: '',
        lastNameHelperText: '',
        emailHelperText:'',
        passwordHelperText:'',
        submitFlag: false
    });

    /********************************* Validator function *************************************/

    function validator() {
        let isError: boolean = false;

        console.log(values.firstName);
        if(! (values.firstName.length > 0) ){
            isError = true;
            values.firstNameHelperText = 'Please enter valid first name';

        } else if(! (values.lastName.length > 0)){
            isError = true;
            values.lastNameHelperText = 'Please enter valid last name';

        } else if(! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))){
            isError = true;
            values.emailHelperText = 'Please enter valid Email ID';

        } else if ((values.password.length < 7)){
            isError = true;
            values.passwordHelperText = 'Please enter minimum 8 characters password ';
        }
        if(isError) {
            setValues({...values})
        }

        return isError;

    }

    /********************************* API call / ComponentDidMount() *************************************/

      React.useEffect(() => {

          if(values.submitFlag){
              (async () => {
                  const err = validator();

                  if(!err){
                      try{
                          console.log("Signup sucessfully");
                          const data: object = {firstName : values.firstName, lastName: values.lastName, email: values.email, passWord: values.password};
                          await Axios.post('/user',data);
                          console.log(data);
                          alert("You have successfully created account!,"+ values.firstName);

                      }catch (error) {
                          console.error(error.message);
                      }
                  }

              })();
          }

    }, [values.submitFlag])

    /********************************* Methods for Onchange and Submit *************************************/
    const handleFirstNameChange = (event: any) => {
        return setValues({...values,firstName: event.target.value})
    };

    const handleLastNameChange = (event: any) => {
        return setValues({...values, lastName: event.target.value})
    };

    const handleLoginPage = () => {
        history.push('/Register')
    };

    const handleSubmit = () => {setValues({...values, submitFlag:true})}





    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className={classes.pageContainer}>
                    <Typography component="div" style={{ height: '100vh' }} >
                        <div>
                            <a href={'http://localhost:3000/homePage'}>parkLogo</a>
                        </div>
                        <div className={classes.signInContainer}>
                            <div>SignIn</div>
                            <div className={classes.textFieldContainer}>

                                <TextField
                                    required
                                    id="filled-required"
                                    label="Email"
                                    variant="filled"
                                />
                                <TextField
                                    required
                                    id="filled-required"
                                    label="Password"
                                    variant="filled"
                                />

                                <Button onClick={handleLoginPage}>Login</Button>
                            </div>

                            <div>
                                <div>Don't Have an Account?</div>
                                <Button>Create New Account</Button>
                            </div>

                        </div>
                    </Typography>

            {/********************************************* SignUp Here ***********************************************/}
                    <form>
                        <Typography>
                            <div>
                                SignUp
                            </div>
                            <div className={classes.signUpContainer}>
                                <div className={classes.textFieldContainer1}>
                                    <TextField
                                        required
                                        id="filled-required"
                                        label="First Name"
                                        value={values.firstName}
                                        defaultValue="Enter First Name"
                                        onChange={handleFirstNameChange}
                                        helperText={values.firstNameHelperText}
                                        variant="filled"
                                    />
                                    <TextField
                                        required
                                        id="filled-required"
                                        label="Last Name"
                                        value={values.lastName}
                                        defaultValue="Enter Last Name"
                                        onChange={handleLastNameChange}
                                        helperText={values.lastNameHelperText}
                                        variant="filled"
                                    />
                                </div>

                                <Email_Input
                                    values={values}
                                    setValues = {setValues}
                                />

                                <Password_Input
                                    values={values}
                                    setValues = {setValues}
                                />
                                <div>
                                    <Button
                                        onClick={handleSubmit}
                                    >
                                        SignUp
                                    </Button>
                                </div>
                            </div>
                        </Typography>
                    </form>
                </Container>
            </React.Fragment>
        </div>
    );
}

export default withRouter(SignUpForm);