import { useNavigate, useParams } from "react-router-dom";

import classes from "./EventForm.module.css";
import { useCallback, useEffect, useReducer } from "react";

function EventForm({ method, event }) {
  const [formData, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case "FETCH":
          return {
            ...state,
            title: payload.title,
            image: payload.image,
            date: payload.date,
            description: payload.description,
          };
        case "TYPING":
          return {
            ...state,
            [payload.key]: payload.value,
          };
        default:
          throw new Error("Invalid action's type");
      }
    },
    {
      title: "",
      image: "",
      date: "",
      description: "",
    }
  );
  const { id } = useParams();
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..", { relative: "path" });
  }
  const handleFetchEventDetail = useCallback(async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8080/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "FETCH", payload: data.event });
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    method === "PATCH" && handleFetchEventDetail(id);
  }, []);
  const handleSubmit = useCallback(
    async function (e) {
      e.preventDefault();
      try {
        const endPoint = id
          ? `http://localhost:8080/events/${id}`
          : "http://localhost:8080/events";
        const response = await fetch(endPoint, {
          headers: {
            "Content-Type": "application/json",
          },
          method,
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra");
        }
        navigate("/events");
      } catch (error) {
        console.log(error);
      }
    },
    [method, formData, id]
  );

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={(e) =>
            dispatch({
              type: "TYPING",
              payload: { key: "title", value: e.target.value },
            })
          }
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          value={formData.image}
          onChange={(e) =>
            dispatch({
              type: "TYPING",
              payload: { key: "image", value: e.target.value },
            })
          }
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={(e) =>
            dispatch({
              type: "TYPING",
              payload: { key: "date", value: e.target.value },
            })
          }
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          value={formData.description}
          onChange={(e) =>
            dispatch({
              type: "TYPING",
              payload: { key: "description", value: e.target.value },
            })
          }
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}

export default EventForm;
