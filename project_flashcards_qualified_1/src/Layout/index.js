import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "../home/DeckList";
import CreateDeck from "../create-deck/CreateDeck";
import Deck from "../deck/Deck";
import Study from "../study/Study";
import AddCard from "../add-card/AddCard";
import { deleteDeck, listDecks } from "../utils/api";

function Layout() {
  const [deckList, setDeckList] = useState([]);
  const [name, setDeckName] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    async function loadListDecks() {
      const list = await listDecks(abortController.signal);
      setDeckList(list);
    }
    loadListDecks();
  }, [deckList]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact="true">
            <DeckList
              deckList={deckList}
              setDeckList={setDeckList}
              setDeckName={setDeckName}
            />
          </Route>{" "}
          <Route path="/decks/new">
            <CreateDeck />
          </Route>{" "}
          <Route path="/decks/:deckId/study" exact="true">
            <Study name={name} />
          </Route>
          <Route path="/decks/:deckId" exact="true">
            <Deck name={name} />
          </Route>
          <Route path="/decks/:deckId/cards/new" exact="true">
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
