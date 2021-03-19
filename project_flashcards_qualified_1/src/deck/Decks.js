import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../utils/api";

export default function Decks({ setRender }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const history = useHistory();
  const [deckInfo, setDeckInfo] = useState({});
  const [renderCards, setCardsRender] = useState(false);

  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;
    async function loadDeck() {
      const tempDeck = await readDeck(deckId, signal);
      setDeckInfo({ ...tempDeck });
      setCards(tempDeck.cards);
    }
    loadDeck();
    return () => {
      abort.abort();
    };
  }, [renderCards]);

  async function handleDeleteDeck() {
    const abort = new AbortController();
    const signal = abort.signal;
    const result = window.confirm(`
    Delete this deck? \n\nYou will not be able to recover it.`);

    if (result) {
      await deleteDeck(deckId, signal);
      setRender(true);
      history.push("/");
    }
  }

  async function handleDeleteCard(event) {
    event.preventDefault();
    let cardId = event.target.getAttribute("id");

    console.log("id", cardId);

    const abort = new AbortController();
    const signal = abort.signal;
    const result = window.confirm(
      `Delete this Card? \n\nYou will not be able to recover it.`
    );

    if (result) {
      try {
        await deleteCard(cardId, signal);
        setCardsRender(!renderCards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
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
            {deckInfo.name}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deckInfo.name}</h3>
      </div>
      <div className="card" style={{ marginTop: "10px" }}>
        <div className="card-body">
          <p>{deckInfo.description}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Link
                  to={`/decks/${deckId}/ed`}
                  className="btn btn-secondary"
                  style={{ marginRight: "10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                  Edit
                </Link>
                <Link
                  to={`/decks/${deckId}/study`}
                  className="btn btn-primary"
                  style={{ margin: "0 10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
              <div>
                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn btn-primary"
                  style={{ margin: "0 10px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
            <div style={{}}>
              <button className="btn btn-danger" onClick={handleDeleteDeck}>
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
      </div>
      {/* end of deck section*/}
      {/* Card List Section*/}

      <div style={{ marginTop: "30px", marginBottom: "0" }}>
        <h1>Cards</h1>
      </div>
      <ul style={{ listStyle: "none", margin: "0px", padding: "0px" }}>
        {cards.map((card, index) => {
          return (
            <li key={index}>
              <div className="card" style={{ marginTop: "5px" }}>
                <div className="card-body">
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: "2", marginRight: "40px" }}>
                      <p>{card.front}</p>
                    </div>
                    <div style={{ flex: "2" }}>
                      <p>{card.back}</p>
                    </div>
                  </div>{" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    {" "}
                    <div>
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className="btn btn-secondary"
                        style={{ marginRight: "10px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                        Edit
                      </Link>
                    </div>
                    <div onClick={handleDeleteCard}>
                      <button id={card.id} className="btn btn-danger">
                        <svg
                          id={card.id}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            id={card.id}
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                          />
                          <path
                            id={card.id}
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
