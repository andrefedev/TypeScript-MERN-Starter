import React from "react";
import { Route, BackButton, Switch } from "react-router-native";
import { Container } from "native-base";
import Articles from "./Article/Articles";
import About from "./About";
import Me from "./User/Me";
import LogIn from "./User/LogIn";
import SignUp from "./User/SignUp";
import Home from "./Home";

interface Props {}

interface States {}

export default class Routes extends React.Component<Props, States> {
    render(): any {
        return <Container>
            <BackButton />
            <Switch>
                <Route exact path="/" render={(props) => <Home {...props} />} />
                <Route path="/article" render={(props) => <Articles {...props} />} />
                <Route path="/about" render={(props) => <About {...props} />} />
                <Route path="/me" render={(props) => <Me {...props} />} />
                <Route path="/login" render={(props) => <LogIn {...props} />} />
                <Route path="/signup" render={(props) => <SignUp {...props} />} />
            </Switch>
        </Container>;
    }
}