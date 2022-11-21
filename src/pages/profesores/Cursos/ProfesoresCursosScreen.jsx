import { saveAs } from "file-saver";
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
  const { register, handleSubmit, reset } = useForm();

  const [grade, setGrade] = useState("0");
  const [subject, setSubject] = useState("0");
  const [title, setTitle] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [uploadedSuccessfully, setUploadedSuccessfully] = useState(false);

  const [isLoading, setIsLoading] = useState(true);


  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/api/read/person_roll", { id_p: user.id })
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
    navigate("/profesores/inscripcion", {
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
    setUploadedSuccessfully(false);
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
    setUploadedSuccessfully(false);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    setUploadedSuccessfully(false);
  };

  // This is for read PDF
  const getPdfClass = (p_id) => {
    const id = p_id.toString()

    axios
      .post("/api/id/course", { id_c: id })
      .then(({ data }) => {
        setActivities({
          id: p_id,
          activities: data.activities,
        });

        return (<RenderActivities id={p_id} />)
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

  // This is for Upload PDFs
  const processIdActivity = async (id_c) => {
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
    const id = data.id;

    return id;
  };

  const getIdActivity = async(id_c) => {
    const id = await processIdActivity(id_c);
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
    let id_c;
    let id;
    if (grade !== undefined && subject !== undefined) {
      id_c = await getIdCourse(grade, subject);
    }
    if (id_c !== undefined) {
      id = await getIdActivity(id_c);
    }

    const formData = new FormData();

    formData.append("a", selectedFile);

    if (id !== undefined) {
      axios
        .post(`/api/add/activity/${id}`, formData)
        .then((res) => {
          getPdfClass(id_c);
          reset();
          setTitle("");
          setSelectedFile();
          setIsFilePicked(false);
          setUploadedSuccessfully(true);
        })
        .catch((err) => {
          setUploadedSuccessfully(false);
          console.log(err);
        });

      // window.location.reload();
    }
  };

  // This is for Delete PDFs
  const onDelete = (act_id, p_class_id) => {
    axios
      .post("/api/delete/activity", { id: act_id })
      .then(({ data }) => {
        if (data.status.msj === 'DB correctly') {
          getPdfClass(p_class_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RenderActivities = ({id}) => {

    return (
      activities.activities.map(
        (activity, activityIndex) => (
          <div key={`activity-${activityIndex}`}>
            <h4 className="mt-3">{activity.title}</h4>
            <button
              className="btn btn-success my-2 mx-2"
              onClick={() =>
                onDownload(activity.pdf_id)
              }
            >
              Descargar
            </button>{" "}
            <button
              className="btn btn-danger my-2 mx-2"
              onClick={() =>
                onDelete(activity.pdf_id, id)
              }
            >
              Borrar
            </button>{" "}
            <br />
          </div>
        )
      )
    )
  }

  const getClasses = () => {
    setIsLoading(true);
    axios
      .post("/api/read/person_roll", { id_p: user.id })
      .then(({ data }) => {
        setYears(Object.keys(data.class));
        setClasses(Object.values(data.class));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const desrollClass = (class_id) => {
    axios
      .post("/api/delete/person_roll", {
        id: user.id,
        id_c: class_id
      })
      .then(({ data }) => {
        getClasses();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <section className="teacher__subjects__home">
        <h1 className="teacher__subjects__title">Cursos</h1>
      </section>
      <section className="teacher__subjects__board">
        <div className="teacher__subjects__board-week">
          <div className="teacher__subjects__board-padding">
            {!isLoading ? (
              years && years.length ? (
                <Accordion
                  alwaysOpen={false}
                  className="teacher__subjects__accordion mx-auto"
                >
                  {years.map((year, yearIndex) => (
                    <div key={`years-${yearIndex}`} className="mx-auto">
                      <h4 className="teacher__subjects__accordion-year text-uppercase my-4">
                        {year}
                      </h4>
                      {classes[yearIndex].map((classItem) => (
                        <Accordion.Item
                          key={`classes-${classItem.id}`}
                          eventKey={classItem.id}
                          onClick={() => getPdfClass(classItem.id)}
                        >
                          <Accordion.Header>{classItem.name}</Accordion.Header>
                          <Accordion.Body className="pt-0" id={`acc-body${classItem.id}`}>
                            {activities &&
                              activities.id === classItem.id &&
                              (activities.activities.length ? (
                                <RenderActivities id={classItem.id} />
                              ) : (
                                <p className='mt-4'>No hay material</p>
                              ))}
                              <hr className="my-4"/>
                              <button className="btn btn-dark teacher__subjects__accordion-button-exit"  onClick={() => desrollClass(classItem.id)}>Salir</button>
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
                  <button className="btn btn-success" onClick={redirect}>Inscribirse</button>
                </div>
              )
            ) : (
              <Spinner animation="border" variant="light" />
            )}
            <hr />
            <h2>Agregar Actividad</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
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
                {
                  uploadedSuccessfully && (
                    <h5 className="text-success">
                      Agregado correctamente
                    </h5>
                  )
                }
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
