import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import RegisterPage from "./RegisterPage";
import SignUpForm from "./SignUpForm";
import UserHome from "./User/UserHome"




export default function  Home() {

    return (
        <div>
            <Router>
                <div>
                    <Switch>

                        <Route path = "/userHome/userHomePage">
                            <UserHome/>
                        </Route>

                        <div>
                            <NavBar/>
                                <Switch>

                                    <Route path = "/signUp">
                                        <SignUpForm />
                                    </Route>

                                    <Route path = "/Register">
                                        <RegisterPage />
                                    </Route>

                                    <Route path = "/">
                                        <HomePage/>
                                    </Route>
                                </Switch>
                        </div>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
