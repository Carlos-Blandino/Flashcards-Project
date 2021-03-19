import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard({ setRender, render }) {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };
  const [deckData, setDeckData] = useState({});

  const [formData, setFormData] = useState({ ...initialFormState });
  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;
    async function loadDeck() {
      const tempDeck = await readDeck(deckId, signal);
      // setDeckInfo({ ...tempDeck });
      setDeckData({ ...tempDeck });
    }
    loadDeck();
    return () => {
      abort.abort();
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function saveCardData() {
      try {
        await createCard(deckId, formData, signal);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    saveCardData();
    setRender(!render);
    setFormData({ ...initialFormState });
    return abortController.abort();
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  function handleReset() {
    history.goBack();
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
            <Link onClick={handleReset}>{deckData.name}</Link>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ marginTop: "7px" }}
          >
            Add Card
          </li>
        </ol>
      </nav>
      <div>
        <h3>{deckData.name}: Add Card</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="name" class="form-label">
              Front
            </label>
            <textarea
              name="front"
              class="form-control"
              id="name"
              value={formData.front}
              onChange={handleChange}
              placeholder="Front side of card"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              Back
            </label>
            <textarea
              class="form-control"
              id="description"
              name="back"
              onChange={handleChange}
              value={formData.back}
              placeholder="Back side of card"
            ></textarea>
          </div>
          <div class="col-auto">
            <button
              type="button"
              onClick={handleReset}
              class="btn btn-secondary mb-3"
              style={{ marginRight: "10px" }}
            >
              Done
            </button>
            <button type="submit" class="btn btn-primary mb-3">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddCard;
