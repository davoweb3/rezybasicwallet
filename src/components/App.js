import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Views
import Login from "./Login";
import Profile from "./Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="*">
            <Profile />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
