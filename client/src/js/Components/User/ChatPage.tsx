import React from 'react';
import { Button }  from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
const backIMG = require('../../Resources/forChatPage.jpg');


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundImage:`url(${backIMG})`,
            backgroundSize:'1450px',
            display: 'flex',
            flexDirection:'column',

        },

        chatRoom: {
            marginLeft: theme.spacing(3),
            color: '#ab8eec'
        },

        boxContainer: {
            marginTop: theme.spacing(5),
        },
        rootContainer: {

            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(40),
                height: theme.spacing(60),
            }
        },

        container: {
            backgroundColor:'#8b320b',
        },

        textField: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(2)
        }

    }),
);

interface IUserName {
    userName: string
}

export default function ChatPage(props: IUserName){

    const  classes = useStyles();
    const [webSocket, setWebSocket] = React.useState();
    const [messages, setMessages] = React.useState([String]);
    const [messageToSend, setMessageToSend] = React.useState('');


    React.useEffect(()=>{

        const webSocket  = new WebSocket('ws://localhost:5000');

        setWebSocket(webSocket);

        webSocket.onmessage = (message) => {

            console.log('Received message: ', message);

            setMessages((oldMessages:any) => [...oldMessages, message]);

        };

        return () => webSocket.close();

    }, []);

    function sendMessage() {

        try {
            if (webSocket && webSocket.readyState === WebSocket.OPEN) {

                // Send the currently typed message to the websocket
                webSocket.send(messageToSend);

                console.log('Sent message to websocket: ', messageToSend);

            }
        }catch (e) {
            console.error(e.message);
        }
    }

    return(

        <div className={classes.root}>
            <div>
                <div className={classes.chatRoom}>
                    <h2>ChatRoom</h2>
                </div>
                <div className={classes.rootContainer}>
                    <Paper variant="outlined" className={classes.container} >
                        <div>
                            <div className={classes.textField}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Write Here"
                                    value={messageToSend}
                                    onChange={(event) => setMessageToSend(event.target.value)}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </div>

                                {
                                    messages.map((message:any, index:any) => {

                                        return (

                                            <div>
                                                <h4 key={index}>

                                                    {props.userName} : {JSON.stringify(message.data)}

                                                </h4>
                                            </div>

                                        )
                                    })
                                }
                        </div>
                    </Paper>
                    <div>
                        <Button style={{color: "white"}} onClick={sendMessage}>
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}