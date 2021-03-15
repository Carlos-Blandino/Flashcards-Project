import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listCards, readCard } from "../utils/api";

export default function Study({ name }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [flip, setFlip] = useState(false);
  const [cardNumber, setCardNumber] = useState(1);
  const [card, setCard] = useState({});

  const totalNumberOfCards = () => {
    let count = 0;

    return count;
  };
  function handleFlip() {
    setFlip(!flip);
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      const tempCards = await listCards(deckId, abortController.signal);
      setCards([tempCards]);
    }
    loadCards();
  }, []);

  function handleNext() {
    setCardNumber(cardNumber + 1);
    const abortController = new AbortController();
    const signal = abortController.signal;
    const newCard = readCard(cardNumber, signal);
    setCard({ ...newCard });
  }

  console.log("test");
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
            {name}
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
      <div>
        <h1>Study:{name}</h1>
      </div>

      {/* card section */}

      <div className="card" style={{ marginTop: "10px", maxWidth: "800px" }}>
        <div className="card-body">
          <h6>
            Card {cardNumber} of {totalNumberOfCards()}
          </h6>
          <p className="card-text">{card.front}</p>
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

              <Link
                to="#"
                className="btn btn-primary"
                style={{ margin: "0 10px" }}
                onClick={handleNext}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end of card section*/}
    </div>
  );
}
