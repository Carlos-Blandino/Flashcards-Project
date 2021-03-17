import React from "react";
import DeckListItem from "./DeckListItem";
import { Link } from "react-router-dom";

export default function DeckList({
  deckList,
  setDeckList,
  setDeckName,
  render,
  setRender,
}) {
  function handleClick() {
    setRender(false);
  }
  return (
    <div>
      <div>
        <Link
          to="/decks/new"
          className="btn btn-secondary"
          style={{ paddingTop: "10px" }}
        >
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
        </Link>
      </div>
      {/*   deck goes here */}

      {deckList.map((deck, index) => (
        <DeckListItem
          deck={deck}
          deckList={deckList}
          index={index}
          setDeckName={setDeckName}
          setDeckList={setDeckList}
        />
      ))}
      {handleClick()}
    </div>
  );
}
