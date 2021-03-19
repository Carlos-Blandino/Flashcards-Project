import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckList from "../home/DeckList";
import CreateDeck from "../create-deck/CreateDeck";
import Decks from "../deck/Decks";
import Study from "../study/Study";
import AddCard from "../add-card/AddCard";
import { listDecks, readDeck } from "../utils/api";
import EditDeck from "../edit-deck/EditDeck";
import EditCard from "../edit-card/EditCard";

function Layout() {
  const [deckList, setDeckList] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadListDecks() {
      const list = await listDecks(abortController.signal);
      setDeckList(list);
    }
    loadListDecks();
  }, [render]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact="true">
            <DeckList
              deckList={deckList}
              setDeckList={setDeckList}
              render={render}
              setRender={setRender}
            />
          </Route>{" "}
          <Route path="/decks/new">
            <CreateDeck
              setDeckList={setDeckList}
              deckList={deckList}
              setRender={setRender}
              render={render}
            />
          </Route>{" "}
          <Route path="/decks/:deckId/study" exact="true">
            <Study />
          </Route>
          <Route path="/decks/:deckId" exact="true">
            <Decks
              deckList={deckList}
              setDeckList={setDeckList}
              setRender={setRender}
            />
          </Route>
          <Route path="/decks/:deckId/edit" exact="true">
            <EditDeck setRender={setRender} render={render} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard setRender={setRender} render={render} />
          </Route>
          <Route path="/decks/:deckId/cards/new" exact="true">
            <AddCard setRender={setRender} render={render} />
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
