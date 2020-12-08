import React, { useContext, useEffect } from "react"
import { Router } from "@reach/router"
import { navigate } from "gatsby"
import Login from "../screens/Admin/Auth"
import Dashboard from "../screens/Admin/Dashboard"
import Settings from "../screens/Admin/Settings"
import Create from "../screens/Admin/Create"
import ReadUpdate from "../screens/Admin/ReadUpdate"
import Layout from "../components/Admin/AppLayout"

const Routes = () => {
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expiresIn"))
    return new Date().getTime() < expiresAt
  }

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate("/login")
      return null
    } else {
      return <Component {...rest} />
    }
  }

  return (
    <Layout>
      <Router>
        {/*<PrivateRoute path='/app' component={Dashboard} />*/}
        <Login path="/login" />
        <Dashboard path="/app" />
        <Settings path="/app/settings" />
        <Create path="/app/create" />
        <ReadUpdate path="/app/readupdate" />
      </Router>
    </Layout>
  )
}

export default Routes
