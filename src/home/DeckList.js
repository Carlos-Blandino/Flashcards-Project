import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";
import DeckListItem from "./DeckListItem";

export default function DeckList() {
  const [deckList, setDeckList] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then((data) => setDeckList(data));
  }, []);

  return (
    <div>
      <div>
        <button className="btn btn-secondary" style={{ paddingTop: "10px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="2 1 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Create Deck
        </button>
      </div>
      {/*   deck goes here */}
      {deckList.map((deck) => (
        <DeckListItem deck={deck} key={deck.id} />
      ))}
      {/* last div */}
    </div>
  );
}
