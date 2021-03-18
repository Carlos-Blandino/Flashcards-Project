import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { listCards, readCard, readDeck, deleteDeck } from "../utils/api";

export default function Deck({ deckInfo, deckList, setDeckList, setRender }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(1);
  const [card, setCard] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      try {
        const tempCards = await listCards(
          parseInt(deckId),
          abortController.signal
        );

        setCards(tempCards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadCards();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function reLoadCard() {
      try {
        const signal = abortController.signal;
        if (cardNumber < cards.length) {
          const newCard = await readCard(cards[cardNumber - 1].id, signal);
          setCard(newCard);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    reLoadCard();
    return () => abortController.abort();
  }, [cards]);

  async function handleDelete() {
    const abort = new AbortController();
    const signal = abort.signal;
    const result = window.confirm(`
    Delete this deck? \n\nYou will not be able to recover it.`);

    if (result) {
      await deleteDeck(deckId, signal);
      setRender(true);
      // const tempList = deckList.slice();
      // tempList.splice(deckId, 1);
      // setDeckList([...tempList]);
      history.push("/");
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="btn btn-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="18"
                fill="currentColor"
                class="bi bi-house-door"
                viewBox="0 0 20 20"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
              </svg>
              Home
            </Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ marginTop: "7px" }}
          >
            {deckInfo.deckName}
          </li>
        </ol>
      </nav>

      <div>
        <h3>{deckInfo.deckName}</h3>
      </div>

      <div className="card" style={{ marginTop: "10px", maxWidth: "800px" }}>
        <div className="card-body">
          <p>{deckInfo.deckDescription}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link
                to={`/decks/${deckId}/cards/new`}
                className="btn btn-primary"
                style={{ margin: "0 10px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="2 1 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Add Cards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* end of card section*/}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link
            to={`/decks/${deckId}`}
            className="btn btn-secondary"
            style={{ marginRight: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="7 2 2 15"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>{" "}
            View
          </Link>
          <Link
            to={`/decks/${deckId}/study`}
            className="btn btn-primary"
            style={{ margin: "0 10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              fill="currentColor"
              className="bi bi-journal-bookmark-fill"
              viewBox="1 0 17 17"
            >
              <path
                fillRule="evenodd"
                d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
              />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>{" "}
            Study
          </Link>
        </div>
        <div style={{}}>
          <button className="btn btn-danger" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
