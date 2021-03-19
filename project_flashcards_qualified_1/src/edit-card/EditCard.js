import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import CardForm from "../card-form/CardForm";

function EditCard({ setRender, render }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };
  const [deckData, setDeckData] = useState({});
  const [formData, setFormData] = useState({ ...initialFormState });
  const mode = "editCard";

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

  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;
    async function loadCard() {
      const tempDeck = await readCard(cardId, signal);
      // setDeckInfo({ ...tempDeck });
      setFormData({ ...tempDeck });
    }
    loadCard();
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
        await updateCard(formData, signal);
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
    handleReset();

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
export default EditCard;
