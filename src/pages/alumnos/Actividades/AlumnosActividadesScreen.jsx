import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
const axios = require("axios").default;

export const AlumnosActividadesScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

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

  return (
    <div>
      <section className="student__activities__home">
        <h1 className="student__activities__title">
          <span className="student__activities__title-p1">Actividades</span>
          <span className="student__activities__title-p2">
            Extracurriculares
          </span>
        </h1>
      </section>
      <section className="student__activities__activities">
        <h2 className="student__activities__activities-title">
          <span className="student__activities__activities-title-p1">
            Calendario
          </span>
          <span className="student__activities__activities-title-p2">De</span>
          <span className="student__activities__activities-title-p3">
            Actividades
          </span>
        </h2>
        <div className="student__activities__activities-container">
          <ul className="student__activities__activities-ul">
            {!isLoading ? (
              activities && activities.length !== 0 ? (
                activities.map((item, index) => (
                  <li
                    key={index}
                    className="student__activities__activities-name-activity"
                  >
                    {item.date} - {item.text}
                  </li>
                ))
              ) : (
                <li className="student__activities__activities-name-activity">
                  No hay actividades
                </li>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};
