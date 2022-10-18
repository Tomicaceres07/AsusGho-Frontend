import { saveAs } from 'file-saver';
import Spinner from "react-bootstrap/Spinner";
import Accordion from "react-bootstrap/Accordion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "context";
import React, { useContext, useEffect, useState } from "react";
const axios = require("axios").default;

export const ProfesoresCursosScreen = () => {
  // Get user from Context
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  // States years and classes
  const [years, setYears] = useState([]);
  const [classes, setClasses] = useState([]);

  const [activities, setActivities] = useState({});

  // Form upload
  const { register, handleSubmit } = useForm();

  const [grade, setGrade] = useState("0");
  const [subject, setSubject] = useState("0");
  const [title, setTitle] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/api/read/person_roll", { id_p: user.id })
      .then(({ data }) => {
        console.log(data);
        setYears(Object.keys(data.class));
        console.log(Object.keys(data.class));

        // setGrade(Object.keys(data.class)[0]);

        setClasses(Object.values(data.class));
        console.log(Object.values(data.class));

        setIsLoading(false);
        // setSubject(Object.values(data.class)[0][0].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id]);

  const redirect = () => {
    navigate("/profesores/perfil", {
      replace: true,
    });
  };

  const hasGrade = () => grade !== "0";

  const hasSubject = () => subject !== "0";

  /* const hasTitle = () => {
    return title !== "";
  }; */

  // Form to Upload PDF depending grade and class
  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
    setSubject("0");
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
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

  // This is for Upload PDFs
  const processIdActivity = async(id_c) => {
    // TODO: recieve the id_c by parameter
    const petition = await axios({
      method: "post",
      url: "/api/add/activity",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id_c: id_c,
        title: title,
      },
    });

    const { data } = petition;
    console.log(data);
    const id = data.id;
    console.log(id);

    return id;
  };

  async function getIdActivity(id_c) {
    console.log(id_c);
    const id = await processIdActivity(id_c);

    console.log(id);

    return id;
  }

  const getIdCourse = async (grade, subject) => {
    let id = "";
    years.map((item, index) => {
      classes[index].map((item, index) => {
        let gradeInString = item.grade.toString();
        if (grade === gradeInString + item.division && subject === item.name) {
          id = item.id;
        }
      });
    });

    return id;
  };

  const onSubmit = async ({ grade, subject }) => {
    console.log("onSubmit");
    console.log(grade, subject);
    let id_c;
    let id;
    if (grade !== undefined && subject !== undefined) {
      id_c = await getIdCourse(grade, subject);
    }
    console.log(id_c);
    if (id_c !== undefined) {
      id = await getIdActivity(id_c);
    }
    console.log(id);

    const formData = new FormData();

    formData.append('a', selectedFile);

    if (id !== undefined) {
      axios
      .post(`/api/add/activity/${id}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      
      window.location.reload();
    }
  };

  return (
    <div>
      <section id="teacher__subjects__home">
        <h1 id="teacher__subjects__title">Cursos</h1>
      </section>
      <section id="teacher__subjects__board">
        <div id="teacher__subjects__board-week">
          <div id="teacher__subjects__board-padding">
            {!isLoading ? (
              years && years.length ? (
                <Accordion alwaysOpen={false} className="teacher__subjects__accordion mx-auto">
                  {years.map((year, yearIndex) => (
                    <div key={`years-${yearIndex}`} className="mx-auto">
                      <h4 className="teacher__subjects__accordion-year text-uppercase my-4">{year}</h4>
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
                                      <button className="btn btn-success" onClick={() => onDownload(activity.pdf_id)}>Descargar</button> <br /> 
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
                  <h4 className="teacher__subjects__board-subject">
                    No estás inscripto a ninguna materia
                  </h4>
                  <button onClick={redirect}>Inscribirse</button>
                </div>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            <hr />
            <h2>Agregar Actividad</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto"
            >
              <h4 className="mt-2">Seleccione el año</h4>
              <select
                name="grade"
                {...register("grade")}
                onChange={handleChangeGrade}
                className="w-100 mb-2 input"
              >
                <option value="0">-- Seleccione el año --</option>
                {years &&
                  years.length !== 0 &&
                  years.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              {grade && (
                <div>
                  <h4>Seleccione la materia</h4>
                  <select
                    name="subject"
                    {...register("subject")}
                    onChange={handleChangeSubject}
                    className="w-100 mb-2 input"
                  >
                    <option value="0">-- Seleccione la materia --</option>
                    {classes.map((item, index) =>
                      item.map(
                        (item, index) =>
                          grade.includes(item.grade + item.division) && (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          )
                      )
                    )}
                  </select>
                </div>
              )}
              <h4>Nombre de la actividad</h4>
              <input
                type="text"
                className="w-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label
                className="btn btn-primary mt-4 mb-2"
                htmlFor="teacher__subjects__input-file"
              >
                Seleccionar Archivo
              </label>
              <input
                type="file"
                id="teacher__subjects__input-file"
                name="file"
                onChange={changeHandler}
                className="mw-100"
                hidden
              />
              {isFilePicked && (
                <div>
                  <p>Nombre del archivo: {selectedFile && selectedFile.name}</p>
                </div>
              )}
              {hasGrade() && hasSubject() && title && isFilePicked && (
                <div>
                  <button className="btn btn-success" onClick={onSubmit}>
                    Agregar
                  </button>
                </div>
              )}
              <div id="teacher__subjects__error" className="text-danger" hidden>
                No seleccionaste ningún curso
              </div>
            </form>

            {/*
                        <div className="teacher__subjects__board-subject-container">
                            <h4 className="teacher__subjects__board-subject">Historia</h4>
                            <p className="teacher__subjects__board-exam">EXAMEN 23/07 - Rev. Industrial</p>
                        </div>
                       */}
          </div>
        </div>
      </section>
    </div>
  );
};