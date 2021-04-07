import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PublicRoutes from "./router";

import { store, history } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/systems/vaults/rewardsystem/rewarddisti"
            />
            <Route path="/" component={PublicRoutes} />
          </Switch>
        </ConnectedRouter>
        <ToastContainer />
      </div>
    </Provider>
  );
}

export default App;
