import React from 'react';
import { Route, Switch, Router, Redirect } from "react-router-dom";
// 路由配置
import Demo  from "./Demo.jsx";
const Routers = ({ history }) => {
    return (
        <Router history={history}>
            <Route render={() => {
                return (
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to={'/home'} />)} />
                        <Route  path="/home" component={Demo}/>
                    </Switch>
                )
            }} />
        </Router>
    )
}

export default Routers;