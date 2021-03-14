import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Decks from "../home/DeckList";

function Layout() {
  return (
    <>
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Header />
            {/* TODO: Implement the screen starting here */}
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
