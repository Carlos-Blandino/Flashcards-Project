import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
  handleReset,
  handleSubmit,
  handleChange,
  deckData,
  formData,
  mode,
}) {
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
              <span style={{border: "none", color: "#4781C4", backgroundColor: "none",  margin: "0px", padding:"0px"}} onClick={handleReset}>{deckData.name}</span>

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
        <h3>
          {mode === "editCard" ? "Edit Card" : `${deckData.name} : Add Card`}
        </h3>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Front
            </label>
            <textarea
              name="front"
              className="form-control"
              id="name"
              value={formData.front}
              onChange={handleChange}
              placeholder="Front side of card"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Back
            </label>
            <textarea
              className="form-control"
              id="description"
              name="back"
              onChange={handleChange}
              value={formData.back}
              placeholder="Back side of card"
            ></textarea>
          </div>
          <div className="col-auto">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary mb-3"
              style={{ marginRight: "10px" }}
            >
              {mode === "editCard" ? "Cancel" : "Done"}
            </button>
            <button type="submit" className="btn btn-primary mb-3">
              {mode === "editCard" ? "Submit" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
