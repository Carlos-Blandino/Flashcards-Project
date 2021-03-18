import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { listCards, readCard, readDeck } from "../utils/api";

export default function Study({}) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [flip, setFlip] = useState(false);
  const [cardNumber, setCardNumber] = useState(1);
  const [card, setCard] = useState({});
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [deckInfo, setDeckInfo] = useState({});

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

  function handleFlip() {
    setFlip(!flip);
    if (cardNumber === cards.length && flip === true) {
      const response = window.confirm(
        "Restart cards?\n\nClick 'cancel to return to the home page."
      );
      if (!response) {
        history.push("/");
      } else {
        async function reLoadCard() {
          const abortController = new AbortController();
          const signal = abortController.signal;
          const tempCards = await listCards(
            parseInt(deckId),
            abortController.signal
          );
          setCards(tempCards);
          if (cardNumber < cards.length) {
            setCards(tempCards);
            const newCard = await readCard(cards[cardNumber].id, signal);
            setCard(newCard);
          }
        }
        reLoadCard();
        setCardNumber(1);
      }
    }
  }

  async function handleNext() {
    //don't reset the flip if its the last card
    //no more cards to view in the cards container
    if (cardNumber === cards.length) {
      if (cardNumber === cards.length && flip === true) {
        const response = window.confirm(
          "Restart cards?\n\nClick 'cancel to return to the home page."
        );
        if (!response) {
          history.push("/");
        } else {
          async function reLoadCard() {
            const abortController = new AbortController();
            const signal = abortController.signal;
            const tempCards = await listCards(
              parseInt(deckId),
              abortController.signal
            );
            setCards(tempCards);
            if (cardNumber < cards.length) {
              setCards(tempCards);
              const newCard = await readCard(cards[cardNumber].id, signal);
              setCard(newCard);
            }
          }
          reLoadCard();
          setCardNumber(1);
        }
      }
      setFlip(!flip);
      return;
    }

    //reset the flip and start over with new card
    setFlip(!flip);
    setCardNumber(cardNumber + 1);
    const abortController = new AbortController();
    const signal = abortController.signal;
    const newCard = await readCard(cards[cardNumber].id, signal);
    setCard({ ...newCard });
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

          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ marginTop: "7px" }}
          >
            Study
          </li>
        </ol>
      </nav>
      {cards.length < 3 ? (
        <div>
          <h1>{deckInfo.name}: Study</h1>
        </div>
      ) : (
        <div>
          <h1>Study:{deckInfo.name}</h1>
        </div>
      )}

      {cards.length < 3 ? (
        <div className="card" style={{ marginTop: "10px", maxWidth: "800px" }}>
          <div className="card-body">
            <h3>Not enough cards.</h3>
            <p>
              You need at least 3 cards to study. There are {cards.length} cards
              in this deck.
            </p>
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
      ) : (
        <div className="card" style={{ marginTop: "10px", maxWidth: "800px" }}>
          <div className="card-body">
            <h6>
              Card {cardNumber} of {cards.length}
            </h6>
            <p className="card-text">
              {flip === true ? card.back : card.front}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Link
                  to="#"
                  className="btn btn-secondary"
                  style={{ marginRight: "10px" }}
                  onClick={handleFlip}
                >
                  Flip
                </Link>
                {flip && (
                  <Link
                    to="#"
                    className="btn btn-primary"
                    style={{ margin: "0 10px" }}
                    onClick={handleNext}
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* end of card section*/}
    </div>
  );
}
