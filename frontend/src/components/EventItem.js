import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const { id } = useParams();
  const navigate = useNavigate();
  async function startDeleteHandler() {
    try {
      const response = await fetch(`http://localhost:8080/events/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/events");
      }
      throw new Error("Có lỗi xảy ra");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
