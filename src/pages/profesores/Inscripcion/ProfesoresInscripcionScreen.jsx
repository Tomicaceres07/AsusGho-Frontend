import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "context";
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;

export const ProfesoresInscripcionScreen = () => {
  const { register, handleSubmit } = useForm();
  
  // This is for inscript a subject
  const [grade, setGrade] = useState(1);
  const [division, setDivision] = useState("a");

  // This is for create a subject
  const [gradeCreate, setGradeCreate] = useState(1);
  const [divisionCreate, setDivisionCreate] = useState("a");
  const [title, setTitle] = useState("");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

  // This is for delete a subject
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const [courses, setCourses] = useState();
  const [subjects, setSubjects] = useState([]);

  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post("/api/division_year/course", {
        grade: grade,
        division: division,
        id_p: user.id,
      })
      .then(({ data }) => {
        setCourses(data.courses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [grade, division, user.id]);

  const handleChangeGrade = (event) => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    setGrade(event.target.value);
    setSubjects([]);
    setDeletedSuccessfully(false);
  };

  const handleChangeDivision = (event) => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    setDivision(event.target.value);
    setSubjects([]);
    setDeletedSuccessfully(false);
  };

  const handleChangeSubjects = (event) => {
    const id = parseInt(event.target.name);

    const isFounded = subjects.find((subject) => subject === id);

    if (!isFounded && event.target.checked) {
      setSubjects([...subjects, id]);
    } else if (isFounded && !event.target.checked) {
      setSubjects(subjects.filter((subject) => subject !== id));
    }
  };

  const addPersonRoll = async (subj) => {
    const petition = await axios
      .post("/api/add/person_roll", {
        id_c: subj,
        id_p: user.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return petition;
  };

  const deleteCourse = async (subj) => {
    console.log(subj);
    const petition = await axios
      .post("/api/delete/course", {
        id_c: subj
      })
      .then((res) => {
        console.log(res);
        setDeletedSuccessfully(true);
        axios
          .post("/api/division_year/course", {
            grade: grade,
            division: division,
            id_p: user.id,
          })
          .then(({ data }) => {
            setCourses(data.courses);
            setSubjects([]);
            document
            .querySelectorAll("input[type=checkbox]")
            .forEach((el) => (el.checked = false));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    return petition;
  };

  const handleChangeGradeCreate = (event) => {
    setGradeCreate(event.target.value);
    setCreatedSuccessfully(false);
    setDeletedSuccessfully(false);
  }

  const handleChangeDivisionCreate = (event) => {
    setDivisionCreate(event.target.value);
    setCreatedSuccessfully(false);
    setDeletedSuccessfully(false);
  }

  const handleChangeTitleCreate = (event) => {
    setTitle(event.target.value)
    setCreatedSuccessfully(false);
    setDeletedSuccessfully(false);
  }

  const onSubmit = () => {
    if (subjects.length >= 1) {
      document.getElementById("teacher__inscription__error").hidden = true;
      subjects.forEach((subj) => {
        addPersonRoll(subj);
      });
      navigate("/profesores/cursos", {
        replace: true,
      });
    } else {
      document.getElementById("teacher__inscription__error").hidden = false;
    }
  };

  const onCreate = (e) => {
    e.preventDefault();
    axios
      .post("/api/add/course", {
        name: title,
        grade: parseInt(gradeCreate),
        division: divisionCreate
      })
      .then(({ data }) => {
        console.log(data);
        setCreatedSuccessfully(true);
        axios
          .post("/api/division_year/course", {
            grade: grade,
            division: division,
            id_p: user.id,
          })
          .then(({ data }) => {
            setCourses(data.courses);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onDelete = (e) => {
    e.preventDefault();
    console.log("click onDelete")
    if (subjects.length >= 1) {
      document.getElementById("teacher__inscription__error").hidden = true;
      subjects.forEach((subj) => {
        deleteCourse(subj);
      });
    } else {
      document.getElementById("teacher__inscription__error").hidden = false;
    }
  }

  return (
    <div>
      <section className="teacher__inscription__home">
        <h1 className="teacher__inscription__home-title">Inscripciones</h1>
      </section>
      <section className="teacher__inscription__board">
        <div className="teacher__inscription__board-week">
          <div className="teacher__inscription__board-padding">
            <h2 className="pt-3">Hola, {user && user.name}</h2>
            <h2>Inscripción a materias</h2>
            <form
              className="teacher__inscription__form text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4 className="teacher__inscription__title">Seleccione el año</h4>
              <select
                name="grade"
                {...register("grade")}
                onChange={handleChangeGrade}
                className="teacher__inscription__dropdown w-100 mb-2 input"
              >
                <option value={1}>1ero</option>
                <option value={2}>2do</option>
                <option value={3}>3ero</option>
                <option value={4}>4to</option>
                <option value={5}>5to</option>
                <option value={6}>6to</option>
              </select>
              <h4 className="teacher__inscription__title">
                Seleccione el curso
              </h4>
              <select
                name="division"
                {...register("division")}
                onChange={handleChangeDivision}
                className="teacher__inscription__dropdown w-100 mb-2 input"
              >
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
              </select>
              {!isLoading ? (
                courses && courses.length >= 1 ? (
                  courses.map((item, courseIndex) => (
                    <div
                      className="text-start teacher__inscription__courses-container"
                      key={courseIndex}
                    >
                      <label htmlFor={item.id}>
                        {item.name}
                        <input
                          type="checkbox"
                          id={item.id}
                          name={item.id}
                          onChange={handleChangeSubjects}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No hay cursos</p>
                )
              ) : (
                <Spinner animation="border" variant="light" />
              )}

              <div
                id="teacher__inscription__error"
                className="text-danger"
                hidden
              >
                No seleccionaste ningún curso
              </div>
              <button
                type="submit"
                className="d-block px-4 mx-auto mb-3 mt-4 btn btn-primary"
                onClick={onSubmit}
              >
                Inscribirse
              </button>
              {user.p_type === 1 && (
                <>
                  <button
                    className="px-4 mb-3 mt-3 ml-3 btn btn-danger"
                    onClick={onDelete}
                  >
                    Borrar
                  </button>
                  {deletedSuccessfully && (
                    <h5 className="text-success">Borrado correctamente</h5>
                  )}
                </>
              )}
            </form>
            {/* If it's a director, he can create subjects */}
            {(user.p_type === 1) && (
              <>
                <hr />
                <h2>Creación de materias</h2>
                <form
                  className="teacher__inscription__form text-center"
                  onSubmit={handleSubmit(onCreate)}
                >
                  <h4 className="teacher__inscription__title">Seleccione el año</h4>
                  <select
                    name="grade-create"
                    {...register("grade-create")}
                    onChange={handleChangeGradeCreate}
                    className="teacher__inscription__dropdown w-100 mb-2 input"
                  >
                    <option value={1}>1ero</option>
                    <option value={2}>2do</option>
                    <option value={3}>3ero</option>
                    <option value={4}>4to</option>
                    <option value={5}>5to</option>
                    <option value={6}>6to</option>
                  </select>
                  <h4 className="teacher__inscription__title">
                    Seleccione el curso
                  </h4>
                  <select
                    name="division-create"
                    {...register("division-create")}
                    onChange={handleChangeDivisionCreate}
                    className="teacher__inscription__dropdown w-100 mb-2 input"
                  >
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                  </select>
                  <h4>Nombre de la materia</h4>
                  <input
                    type="text"
                    className="w-100"
                    value={title}
                    onChange={handleChangeTitleCreate}
                  />
                  { title.length > 1 && (
                    <button
                      type="submit"
                      className="display-block mx-auto mb-3 mt-3 btn btn-success"
                      onClick={onCreate}
                    >
                      Crear
                    </button>
                  )}
                </form>
                {createdSuccessfully && (
                  <h5 className="text-success">Creado correctamente</h5>
                )}
              </>
              )}
          </div>
        </div>
      </section>
    </div>
  );
};
