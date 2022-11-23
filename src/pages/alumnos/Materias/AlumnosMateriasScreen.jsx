import { saveAs } from "file-saver";
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context";
import React, { useContext, useEffect, useState } from "react";
const axios = require("axios").default;

export const AlumnosMateriasScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const [activities, setActivities] = useState({});
  const [years, setYears] = useState([]);
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/api/read/student_roll", { id_s: user.id })
      .then(({ data }) => {
        setYears(Object.keys(data.class));
        setClasses(Object.values(data.class));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id]);

  const redirect = () => {
    navigate("/alumnos/inscripcion", {
      replace: true,
    });
  };

  // This is for read PDF
  const getPdfClass = (p_id) => {
    setActivities({});

    const id = p_id.toString();

    axios
      .post("/api/id/course", { id_c: id })
      .then(({ data }) => {
        setActivities({
          id: p_id,
          activities: data.activities,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // This is for Download PDFs
  const getActivity = async (pdf_id) => {
    const id = pdf_id.toString();
    return axios({
      method: "post",
      url: "/api/activity/pdf",
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
      data: {
        id: id,
      },
    });
  };

  const onDownload = async (pdf_id) => {
    const { data } = await getActivity(pdf_id);
    const blob = new Blob([data], { type: "application/pdf" });
    saveAs(blob, "Actividad.pdf");
  };

  const getClasses = () => {
    setIsLoading(true);
    axios
      .post("/api/read/student_roll", { id_s: user.id })
      .then(({ data }) => {
        setYears(Object.keys(data.class));
        setClasses(Object.values(data.class));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const desrollClass = (class_id) => {
    axios
      .post("/api/delete/student_roll", {
        id: user.id,
        id_c: class_id,
      })
      .then(({ data }) => {
        getClasses();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="student__subjects__home">
        <h1 className="student__subjects__title">Materias</h1>
      </section>
      <section className="student__subjects__board">
        <div className="student__subjects__board-week">
          <div className="student__subjects__board-padding d-flex">
            {!isLoading ? (
              years && years.length ? (
                <Accordion
                  alwaysOpen={false}
                  className="student__subjects__accordion mx-auto"
                >
                  {years.map((year, yearIndex) => (
                    <div key={`years-${yearIndex}`} className="mx-auto">
                      <h4 className="student__subjects__accordion-year text-uppercase my-4">
                        {year}
                      </h4>
                      {classes[yearIndex].map((classItem, classIndex) => (
                        <Accordion.Item
                          key={`classes-${classItem.id}`}
                          eventKey={classItem.id}
                          onClick={() => getPdfClass(classItem.id)}
                        >
                          <Accordion.Header>{classItem.name}</Accordion.Header>
                          <Accordion.Body className="pt-0">
                            {activities &&
                              activities.id === classItem.id &&
                              (activities.activities.length ? (
                                activities.activities.map(
                                  (activity, activityIndex) => (
                                    <div key={`activity-${activityIndex}`}>
                                      <h4 className="mt-3">{activity.title}</h4>
                                      <button
                                        className="btn btn-success"
                                        onClick={() =>
                                          onDownload(activity.pdf_id)
                                        }
                                      >
                                        Descargar
                                      </button>{" "}
                                      <br />
                                    </div>
                                  )
                                )
                              ) : (
                                <p className="mt-4">No hay material</p>
                              ))}
                            <hr className="my-4" />
                            <button
                              className="btn btn-dark teacher__subjects__accordion-button-exit"
                              onClick={() => desrollClass(classItem.id)}
                            >
                              Salir
                            </button>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </div>
                  ))}
                </Accordion>
              ) : (
                <div>
                  <h4 className="student__subjects__board-subject">
                    No estás inscripto a ninguna materia
                  </h4>
                  <button className="btn btn-success" onClick={redirect}>
                    Inscribirse
                  </button>
                </div>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
