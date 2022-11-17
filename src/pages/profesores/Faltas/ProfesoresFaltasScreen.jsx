import Table from "react-bootstrap/Table";
import { AuthContext } from "context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

export const ProfesoresFaltasScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  // Absences to show in table
  const [absences, setAbsences] = useState();

  // Searcher Form
  const [person, setPerson] = useState("");
  const [name, setName] = useState("");

  // Add Form
  const [quantity, setQuantity] = useState("0");
  const [justified, setJustified] = useState("0");

  // People Founded
  const [people, setPeople] = useState([]);
  const [peopleFounded, setPeopleFounded] = useState(true);

  // Name, Mail and Total Absences of person selected
  const [realName, setRealName] = useState("");
  const [actualEmail, setActualEmail] = useState("");
  const [totalAbsences, setTotalAbsences] = useState("");


  useEffect(() => {
    if (user.p_type === 0) {
      axios
        .post("/api/get_abs", { email: user.email })
        .then(({ data }) => {
          setAbsences(data.db);
          console.log(data.db);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user.email]);

  // Searcher Form
  const handleChangePerson = (event) => {
    console.log(event.target.value);
    setPerson(event.target.value);
    setAbsences("");
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const findPeople = (e) => {
    e.preventDefault();
    setPeopleFounded(false);
    let route;
    if (person === "student") {
      route = "/api/search/student";
    } else if (person === "teacher") {
      route = "/api/search/person";
    }

    axios
      .post(route, {
        name: name,
      })
      .then(({ data }) => {
        if (person === "student") {
          if (data.students.length) {
            setPeopleFounded(true);
          }
          setPeople(data.students);
        } else if (person === "teacher") {
          setPeople(data.persons);
          if (data.persons.length) {
            setPeopleFounded(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add Form
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }
  
  const handleChangeJustified = (event) => {
    setJustified(event.target.value);
  }

  const getAbsencesFromEmail = (email, name) => {
    if (name !== undefined) {
      setRealName(name);
    }
    setActualEmail(email);
    axios
      .post("/api/get_abs", { email: email })
      .then(({ data }) => {
        setAbsences(data.db);
        setTotalAbsences(data.abs);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const addAbsence = (e) => {
    e.preventDefault();
    axios
      .post("/api/abs", {
        email: actualEmail,
        c_abscence: quantity,
        justified: justified
      })
      .then(({ data }) => {
          getAbsencesFromEmail(actualEmail);
          console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAbsence = (p_id) => {
    axios
      .post("/api/del_abs", { email: actualEmail, id: p_id })
      .then(({ data }) => {
        if (data.msj === "deleted") {
          getAbsencesFromEmail(actualEmail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className="teacher__absences__home">
        <h1 className="teacher__absences__title">Inasistencias</h1>
        <h2 className="teacher__absences__subtitle">{user && user.name}</h2>
      </section>
      <section className="teacher__absences__board">
        {/* If it's a profesor */}
        {user.p_type === 0 ? (
          <div>
            <h3 className="teacher__absences__board-title">
              Faltas: {absences && absences.length}
            </h3>
            <div className="teacher__absences__board-container-table">
              <Table
                responsive
                striped
                className="teacher__absences__board-table"
              >
                <thead>
                  <tr>
                    <th className="teacher__absences__board-th">#</th>
                    <th className="teacher__absences__board-th">Fecha</th>
                    <th className="teacher__absences__board-th">Cantidad</th>
                    <th className="teacher__absences__board-th">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {absences &&
                    absences.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>{item.c_abscence}</td>
                        <td
                          className={
                            item.justified === 0
                              ? "teacher__absences__board-unjustified"
                              : ""
                          }
                        >
                          {item.justified === 0
                            ? "Injustificada"
                            : "Justificada"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        ) : (
          /* If it's a directive */
          user.p_type === 1 && (
            <>
              <div className="teacher__absences__searcher-container">
                <h2 className="teacher__absences__board-title">Buscador</h2>
                <form className="mx-auto">
                  <h4 className="mt-2">Seleccione la persona</h4>
                  <select
                    name="person"
                    value={person}
                    onChange={handleChangePerson}
                    className="w-100 mb-2 input"
                  >
                    <option value="0">-- Seleccione la persona --</option>
                    <option value="student">Alumno</option>
                    <option value="teacher">Profesor</option>
                  </select>
                  <h4>Nombre de la persona</h4>
                  <input
                    type="text"
                    className="w-100"
                    onChange={handleChangeName}
                  />
                  <div>
                    <button
                      className="btn btn-primary my-3"
                      onClick={findPeople}
                    >
                      Buscar
                    </button>
                  </div>
                </form>
                {people && (
                  peopleFounded ? (
                    <ul className="list-unstyled">
                      {people &&
                        people.map((item, peopleIndex) => (
                          <li key={peopleIndex}>
                            <button
                              className="teacher__absences__people-button"
                              onClick={() =>
                                getAbsencesFromEmail(item.email, item.name)
                              }
                            >
                              {item.name} - {item.email}
                            </button>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>No se encontró a nadie</p>
                  )
                )}
                {totalAbsences === 0 && (
                  <h5 className="teacher__absences__msg-no-abs">
                    {realName} No tiene faltas
                  </h5>
                )}
              </div>

              {/* Absences Table  */}
              {absences && totalAbsences !== 0 && (
                <>
                  <h3 className="text-center">
                    Faltas de {realName}: {totalAbsences}
                  </h3>
                  <div className="teacher__absences__board-container-table">
                    <Table
                      responsive
                      striped
                      className="teacher__absences__board-table"
                    >
                      <thead>
                        <tr>
                          <th className="teacher__absences__board-th">#</th>
                          <th className="teacher__absences__board-th">Fecha</th>
                          <th className="teacher__absences__board-th">
                            Cantidad
                          </th>
                          <th className="teacher__absences__board-th">
                            Estado
                          </th>
                          <th className="teacher__absences__board-th">
                            ¿Borrar?
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {absences &&
                          absences.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.date}</td>
                              <td>{item.c_abscence}</td>
                              <td
                                className={
                                  item.justified === 0
                                    ? "teacher__absences__board-unjustified"
                                    : ""
                                }
                              >
                                {item.justified === 0
                                  ? "Injustificada"
                                  : "Justificada"}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteAbsence(item.id)}
                                >
                                  Borrar
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}

              {/* Add Form */}
              {actualEmail ? (
                <div className="mx-auto w-25">
                  <h2 className="text-center mt-4">Agregar Falta</h2>
                  <p className="text-center">{actualEmail}</p>
                  <form className="mx-auto">
                    <h4 className="mt-2">Seleccione la cantidad</h4>
                    <select
                      name="quantity"
                      value={quantity}
                      onChange={handleChangeQuantity}
                      className="w-100 mb-2 input"
                    >
                      <option value="0">-- Seleccione la cantidad --</option>
                      <option value={0.25}>0.25</option>
                      <option value={0.5}>0.5</option>
                      <option value={0.75}>0.75</option>
                      <option value={1}>1</option>
                    </select>
                    <h4>Seleccione si está justificada</h4>
                    <select
                      name="justified"
                      value={justified}
                      onChange={handleChangeJustified}
                      className="w-100 mb-2 input"
                    >
                      <option value="0">-- Seleccione si está justificada --</option>
                      <option value={false}>No</option>
                      <option value={true}>Si</option>
                    </select>
                    {
                      (quantity !== "0" && justified !== "0") && (
                        <div>
                          <button
                            className="btn btn-success my-3"
                            onClick={addAbsence}
                          >
                            Agregar
                          </button>
                        </div>
                      )
                    }
                  </form>
                </div>
              ) : (
                <p className="text-center">Selecciona una persona para agregarle faltas</p>
              )}
            </>
          )
        )}
      </section>
    </div>
  );
};
