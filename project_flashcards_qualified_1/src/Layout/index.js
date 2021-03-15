import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "../home/DeckList";
import CreateDeck from "../create-deck/CreateDeck";
import Deck from "../deck/Deck";
import Study from "../study/Study";
import { deleteDeck, listDecks } from "../utils/api";

function Layout() {
  const [deckList, setDeckList] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then((data) => setDeckList(data));
  }, []);

  const [deck, setDeck] = useState([]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <DeckList
              deckList={deckList}
              setDeckList={setDeckList}
              deck={deck}
              setDeck={setDeck}
            />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>{" "}
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <Deck deck={deckList} />
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
