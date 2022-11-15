import Table from "react-bootstrap/Table";
import { AuthContext } from "context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

export const ProfesoresFaltasScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  const [absences, setAbsences] = useState();

  const [person, setPerson] = useState("");
  const [name, setName] = useState("");

  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .post("/api/get_abs", { email: user.email })
      .then(({ data }) => {
        setAbsences(data.db);
        console.log(data.db);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.email]);

  const handleChangePerson = (event) => {
    console.log(event.target.value);
    setPerson(event.target.value);
  };

  const handleChangeName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          setPeople(data.students);
        } else if (person === "teacher") {
          setPeople(data.persons);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAbsencesFromEmail = (email) => {
    console.log(email);
    axios
      .post("/api/get_abs", { email: email })
      .then(({ data }) => {
        setAbsences(data.db);
        console.log(data.db);
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
        {user.p_type === 0 ? (
          <div>
            <h3 className="teacher__absences__board-title">
              Faltas: {absences && absences.length}
            </h3>
            <div className="teacher__absences__board-container-table">
              <Table responsive striped className="teacher__absences__board-table">
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
                    <button className="btn btn-success my-3" onClick={handleSubmit}>
                      Buscar
                    </button>
                  </div>
                </form>
                {people && (
                  <ul className="list-unstyled">
                    {people &&
                      people.map((item, peopleIndex) => (
                        <li key={peopleIndex}>
                          <button
                            className="teacher__absences__people-button"
                            onClick={() => getAbsencesFromEmail(item.email)}
                          >
                            {item.name} - {item.email}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </div>


              {absences && (
                <div className="teacher__absences__board-container-table">
                  <Table responsive striped className="student__absences__board-table">
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
              )}
            </>
          )
        )}
      </section>
    </div>
  );
};
