import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import UserNav from "./UserNav";
import UserHomePage from "./UserHomePage";
import BuyTicketsPage from "./BuyTicketsPage";
import {useSelector} from "react-redux";
import {IRootReducer} from "../../../redux/IRootReducer";
import Axios from "axios";
import ChatPage from "./ChatPage";

interface  State {
    userName: string
}

export default function  UserHome() {

    const email : string | undefined = useSelector<IRootReducer, string | undefined> (state => state.userReducer.email);

    const [values, setValues] = React.useState<State> ({

        userName: ""
    });

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

    return (
        <div>
            <Router>
                <div>
                    <UserNav {...values.userName}/>
                    <Switch>

                        <Route path = "/chat">
                            <ChatPage userName={values.userName} />
                        </Route>

                        <Route path = "/userHome/profilePage">
                            <ProfilePage/>
                        </Route>

                        <Route path = "/userHome/userHomePage">
                            <UserHomePage userName={values.userName}/>
                        </Route>

                        <Route path = "/userHome/buyTickets">
                            <BuyTicketsPage/>
                        </Route>

                        {/*<Route path = "/Rides">*/}
                        {/*    <RidePage/>*/}
                        {/*</Route>*/}

                    </Switch>
                </div>
            </Router>
        </div>
    );
}