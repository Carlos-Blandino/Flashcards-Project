import React, {useState, useEffect} from "react";
import DeckListItem from "./DeckListItem";
import {Link} from "react-router-dom";
import {listDecks} from "../utils/api";

export default function DeckList() {
    const [render, setRender] = useState(false);
    const [deckList, setDeckList] = useState([]);

    useEffect(() => {

        const abortController = new AbortController();
        async function loadListDecks() {
            try {
                const list = await listDecks(abortController.signal);
                setDeckList(list)

            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }

        loadListDecks();
        return() => {
            abortController.abort();
        }
    }, [render]);

    return (
        <div>
            <div>
                <Link
                    to="/decks/new"
                    className="btn btn-secondary"
                    style={{paddingTop: "10px"}}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-plus"
                        viewBox="2 1 16 16"
                    >
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                    Create Deck
                </Link>
            </div>
            {/*   deck goes here */}

                {deckList.map((deck, index) => (
                    <div key={index}>
                        <DeckListItem
                            deck={deck}
                            index={index}
                            setRender={setRender}
                            render={render}
                        />
                    </div>
                ))}

        </div>
    );
}
