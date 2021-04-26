import React  from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "../home/DeckList";
import CreateDeck from "../create-deck/CreateDeck";
import Decks from "../deck/Decks";
import Study from "../study/Study";
import AddCard from "../add-card/AddCard";
import EditDeck from "../edit-deck/EditDeck";
import EditCard from "../edit-card/EditCard";

function Layout() {


  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <DeckList  />
          </Route>{" "}
          <Route path="/decks/new" exact>
            <CreateDeck />
          </Route>{" "}
          <Route path="/decks/:deckId/study" exact>
            <Study />
          </Route>
          <Route path="/decks/:deckId" exact>
            <Decks />
          </Route>
          <Route path="/decks/:deckId/edit" exact>
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new" exact>
            <AddCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
