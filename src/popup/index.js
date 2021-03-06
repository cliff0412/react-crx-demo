import React, {Fragment} from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import './popup.styl'
// import '@/content'

function Popup() {
    return (
        <Fragment>
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Redirect to={'/login'}></Redirect>
                </Switch>
            </HashRouter>
        </Fragment>
    )
}

export default Popup