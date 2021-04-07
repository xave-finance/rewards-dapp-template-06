import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StableCoin from "./containers/StableCoin";

const PublicRoutes = ({ match }) => {
  // console.log('ddd', match.url);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={`${match.url}`} component={StableCoin} />
      </Switch>
      <Footer />
    </>
  );
};

export default PublicRoutes;
