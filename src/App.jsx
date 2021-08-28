import React from "react";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Routers } from "./Routes";

const App = () => {
  return (
    <Container>
      <Switch>
        {Routers.map(({ component, exact, path, redirect }) => {
          if (redirect) {
            return (
              <Redirect
                key={path}
                to={redirect}
                exact={exact}
                component={component}
              />
            );
          }

          return (
            <Route key={path} path={path} exact={exact} component={component} />
          );
        })}
      </Switch>
    </Container>
  );
};

export default App;
