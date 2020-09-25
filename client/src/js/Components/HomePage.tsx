import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";


const backIMG = require('../Resources/registerBackIMG.jpg');



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundImage:`url(${backIMG})`,
            backgroundSize:'1500px',
            display:'flex',
            height: theme.spacing(100),
            flexDirection:'row',
        },

        pageContainer: {
            marginTop: theme.spacing(5),
        },

        section1: {
            flexDirection:'column',
            filter:'blur(2px)'
        },

        section2: {

            color:'white',
            fontWeight:'bold',
            border:'3px solid #f1f1f1',
            position:'absolute',
            top:'40%',
            left:'25%',
            zIndex: theme.spacing(2),
            textAlign:'center',
            boxSizing:'border-box'

        },
    }),
);






export default function  HomePage() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <React.Fragment>
                <CssBaseline />
                <Container fixed className={classes.pageContainer}>
                    <div>
                        <div className = {classes.section1}></div>
                        <div className={classes.section2} style={{backgroundColor:'rgba(0,0,0, 0.4)'}}>
                            <h1 style={{fontSize: '50px'}}> Welcome to Amusement Park</h1>
                            <h3>The Ride May be Over in 17 seconds, But it’ll Stay with you Forever.</h3>
                        </div>
                    </div>
                    <Typography>

                    </Typography>
                </Container>
            </React.Fragment>
        </div>
    );
}
