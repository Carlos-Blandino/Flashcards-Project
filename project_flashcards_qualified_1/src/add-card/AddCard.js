import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "../card-form/CardForm";

function AddCard({ setRender, render }) {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };
  const [deckData, setDeckData] = useState({});
  const [formData, setFormData] = useState({ ...initialFormState });
  const [mode, setMode] = useState("addCard");

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
    <CardForm
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      deckData={deckData}
      mode={mode}
    />
  );
}
export default AddCard;
