import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  function handleSubmit(event) {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function saveDeckData() {
      try {
        await createDeck(formData, signal);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    saveDeckData();
    setFormData({ ...initialFormState });
    return abortController.abort();
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleReset() {
    setFormData({ ...initialFormState });
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
                className="bi bi-house-door"
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
            Create Deck
          </li>
        </ol>
      </nav>
      <div>
        <h1>Create Deck</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Deck Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              onChange={handleChange}
              value={formData.description}
              placeholder="Brief description of deck"
            ></textarea>
          </div>
          <div className="col-auto">
            <button
              type="reset"
              onClick={handleReset}
              className="btn btn-secondary mb-3"
              style={{ marginRight: "10px" }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateDeck;
