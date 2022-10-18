import { saveAs } from 'file-saver';
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
    navigate("/alumnos/perfil", {
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
        console.log("data ", data);
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
  const getActivity = async(pdf_id) => {
    const id = pdf_id.toString();
    console.log(id);
    return axios({
      method: 'post',
      url: "/api/activity/pdf",
      headers: {
        'Content-Type': 'application/json'
      }, 
      responseType: 'arraybuffer',
      data: {
        "id": id
      }
    })
  }

  const onDownload = async(pdf_id) => {
    const { data } = await getActivity(pdf_id)
    const blob = new Blob([data], { type: 'application/pdf' })
    saveAs(blob, "Actividad.pdf")
  }

  return (
    <div>
      <section id="student__subjects__home">
        <h1 id="student__subjects__title">Materias</h1>
      </section>
      <section id="student__subjects__board">
        <div id="student__subjects__board-week">
          <div id="student__subjects__board-padding" className="d-flex">
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
                          <Accordion.Body>
                            {activities &&
                              activities.id === classItem.id &&
                              (activities.activities.length ? (
                                activities.activities.map(
                                  (activity, activityIndex) => (
                                    <div key={`activity-${activityIndex}`}>
                                      <h4>{activity.title}</h4>
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
                                <div>No hay material</div>
                              ))}
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
                  <button onClick={redirect}>Inscribirse</button>
                </div>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            {/* {
                            classes && classes.length !== 0
                            ?   (
                                classes.map( (item, index) => (
                                <div key={ index } className="student__subjects__board-subject-container">
                                    <h4 className="student__subjects__board-subject"></h4>
                                </div>
                                ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}
            {/* {
                            classes && classes.length !== 0
                            ?   (
                                classes.map( (item, index) => (
                                    <div key={index}>

                                        {
                                            Object.values(item).map((item, index) => {
                                                <div key={index}>
                                                    {
                                                        item.map( (item, index) => (
                                                            <div key={index}>
                                                            {
                                                                item.name.length >= 1 && <h4 className="student__subjects__board-subject">{item.name && item.name}</h4>
                                                            }

                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            })
                                        }
                                    </div>
                                ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}

            {/* {
                            classes && classes.length !== 0
                            ?   (
                                    grades.map((item, index) => (
                                    <div>
                                    <h5>{item}</h5>
                                        {
                                            
                                        divisions.map((item, index) => (
                                            <div>
                                            <h5>{item}</h5>
                                            <Accordion key={index}>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                    <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                    culpa qui officia deserunt mollit anim id est laborum.
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            </div>
                                        ))
                                        }
                                    </div>
                                    ))
                                )
                            :   (
                                    <div>
                                        <h4 className="student__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        } */}
          </div>
        </div>
      </section>
    </div>
  );
};
