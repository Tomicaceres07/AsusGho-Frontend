import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

export const ProfesoresActividadesScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const { register, handleSubmit, resetField } = useForm();
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/api/message/read", { type: user.type })
      .then(({ data }) => {
        setActivities(data.element);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.type]);

  const onAdd = (data) => {
    const date = moment(data.date).format("DD/MM/YYYY");
    axios
      .post("/api/message/write", {
        date: date,
        text: data.text,
        type: user.type,
      })
      .then(({ data }) => {
        if (data.msj.msj === "DB correctly") {
          setIsLoading(true);
          axios
            .post("/api/message/read", { type: user.type })
            .then(({ data }) => {
              setActivities(data.element);
              resetField("text");
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (p_id) => {
    const id = p_id.toString();

    axios
      .post("/api/message/delete", { id: id })
      .then(({ data }) => {
        if (data.element.msj === "DB correctly") {
          setIsLoading(true);
          axios
            .post("/api/message/read", { type: user.type })
            .then(({ data }) => {
              setActivities(data.element);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="teacher__activities__home">
        <h1 className="teacher__activities__title">
          <span className="teacher__activities__title-p1">Actividades</span>
          <span className="teacher__activities__title-p2">
            Extracurriculares
          </span>
        </h1>
      </section>
      <section className="teacher__activities__activities">
        <h2 className="teacher__activities__activities-title">
          <span className="teacher__activities__activities-title-p1">
            Calendario
          </span>
          <span className="teacher__activities__activities-title-p2">De</span>
          <span className="teacher__activities__activities-title-p3">
            Actividades
          </span>
        </h2>
        <div className="teacher__activities__activities-container">
          <ul className="teacher__activities__activities-ul">
            {!isLoading ? (
              activities && activities.length !== 0 ? (
                activities.map((item, index) => (
                  <div
                    key={index}
                    className="teacher__activities__activity-container"
                  >
                    <li className="teacher__activities__activities-name-activity">
                      {item.date} - {item.text}
                    </li>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn btn-danger h-25 align-self-center"
                    >
                      Borrar
                    </button>
                  </div>
                ))
              ) : (
                <li className="teacher__activities__activities-name-activity">
                  No hay actividades
                </li>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </ul>
          <hr />
          <form
            action="#"
            className="teacher__activities__form"
            onSubmit={handleSubmit(onAdd)}
          >
            <label htmlFor="input-date">Fecha: </label>
            <input
              type="date"
              {...register("date")}
              id="input-date"
              className="mb-3"
              required
            />

            <label htmlFor="input-text">Actividad: </label>
            <input
              type="text"
              {...register("text")}
              id="input-text"
              className="mb-3"
              required
            />

            <button className="btn btn-success" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
