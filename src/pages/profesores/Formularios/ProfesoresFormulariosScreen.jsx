import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect, useContext } from "react";
import { saveAs } from 'file-saver';
import { AuthContext } from 'context';
const axios = require('axios').default;

export const ProfesoresFormulariosScreen = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  
  const [formsTeachers, setFormsTeachers] = useState();
  const [formsAlumns, setFormsAlumns] = useState();
  
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  const [isLoadingAlumns, setIsLoadingAlumns] = useState(true);
  
  const [person, setPerson] = useState(false);

  const [error, setError] = useState(false);

  //  This is for Read Teachers PDFs 
  useEffect(() => {
      setIsLoadingTeachers(true); 
      // type false is for teachers
      axios.post('/api/pdf/arrread', {"type":false})
        .then(({data}) => {
          setFormsTeachers(data.element);
          setIsLoadingTeachers(false);
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])
  
  //  This is for Read Alumns PDFs 
  useEffect(() => {
      setIsLoadingAlumns(true); 
      // type true is for alumns
      axios.post('/api/pdf/arrread', {"type":true})
        .then(({data}) => {
          setFormsAlumns(data.element);
          setIsLoadingAlumns(false);
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])
  

  // This is for Upload PDFs
  const processIdForm = async () => {
    const petition = await axios({
      method: 'post',
      url: "/api/pdf/data_insert",
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "name": selectedFile.name,
        "type": person
      }
    })

    console.log(petition)


    const { data } = petition;

    if (data.msj === 'pdf already exist') {
      setError(true)
      return null;
    }
    const id = data.id[0][0];

    return id;
  }
  
  const getIdForm = async () => {

    const id = await processIdForm()

    return id;
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = async () => {
    console.log("handleSubmission")
    const id = await getIdForm();
    console.log(id);

    const formData = new FormData();

    formData.append('a', selectedFile);

    axios.post(`/api/pdf/insert/${id}`, formData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

    error && window.location.reload();
  };

  
  // This is for Download PDFs
  async function getForm(id) {
    return axios({
      method: 'post',
      url: "/api/message/pdf/oneread",
      headers: {
        'Content-Type': 'application/json'
      }, 
      responseType: 'arraybuffer',
      data: {
        "id": id
      }
    })
  }

  async function onDownload(id) {
    const { data } = await getForm(id)
    console.log(data);
    const blob = new Blob([data], { type: 'application/pdf' })
    saveAs(blob, `Formulario F${id}.pdf`)
  }
  
  // This is for Delete PDFs
  async function onDelete(id) {
    axios.post('/api/pdf/delete', {"id":id})
        .then(({data}) => {
          console.log(data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
  }

  const handleChangePerson = (event) => {
    console.log(event.target.value);
    setPerson(event.target.value);
  };

  return (
    <div>
      <section id="teacher__forms__home">
        <h1 id="teacher__forms__title">Formularios</h1>
      </section>
      <section id="teacher__forms__board">
        <div id="teacher__forms__board-week">

          {
            user.p_type === 1 && (
              <h2 className='pt-5 mb-0'>Formularios de los Profes</h2>
            )
          }
          <div id="teacher__forms__board-padding">
            {
              !isLoadingTeachers 
              ? (
                formsTeachers && formsTeachers.length !== 0
                  ? (formsTeachers.map( (item, index) => (
                  <div className="teacher__forms__board-form-container" key={index}>
                    <h4 className="teacher__forms__board-form">Formulario F{item.id}</h4>
                    <p className="teacher__forms__board-text">{item.name}</p>
                    <button className="teacher__forms__board-button-download" onClick={() => onDownload(item.id)}>Descargar F{item.id}</button> <br />  
                    <button className="btn btn-danger" onClick={() => onDelete(item.id)}>Borrar</button>
                  </div>
                  )))
                  : (
                    <h2>No hay formularios</h2>
                  )
              )
              : (
                <Spinner animation="border" variant="light" />
              )
            }
          </div>

          {
            user.p_type === 1 && (
              <>
                <hr />
                <h2 className='pt-4 mb-0'>Formularios de los Alumnos</h2>
                <div id="teacher__forms__board-padding">
                  {
                    !isLoadingAlumns 
                    ? (
                      formsAlumns && formsAlumns.length !== 0
                        ? (formsAlumns.map( (item, index) => (
                        <div className="teacher__forms__board-form-container" key={index}>
                          <h4 className="teacher__forms__board-form">Formulario F{item.id}</h4>
                          <p className="teacher__forms__board-text">{item.name}</p>
                          <button className="teacher__forms__board-button-download" onClick={() => onDownload(item.id)}>Descargar F{item.id}</button> <br />  
                          <button className="btn btn-danger" onClick={() => onDelete(item.id)}>Borrar</button>
                        </div>
                        )))
                        : (
                          <h2>No hay formularios</h2>
                        )
                    )
                    : (
                      <Spinner animation="border" variant="light" />
                    )
                  }
                </div>
              </>
            )
          }
          <hr />
          <div className='mw-100'>
              <h2>Agregar Formulario</h2>
              {
                user.p_type === 1 && (
                  <form className="mx-auto">
                    <h4 className="mt-2">¿Para quien es?</h4>
                    <select
                      name="person"
                      value={person}
                      onChange={handleChangePerson}
                      className="mb-2 input"
                    >
                      <option value={false}>Profesores</option>
                      <option value={true}>Alumnos</option>
                    </select>
                  </form>
                )
              }
              <label className="btn btn-primary my-2" htmlFor="teacher__forms__input-file">Seleccionar Archivo</label>
              <input type="file" name="file" onChange={changeHandler} id="teacher__forms__input-file" className='mw-100' hidden/>
              {
                error && (
                  <h5>Ya existe un PDF con el mismo nombre.</h5>
                )
              }
              {isFilePicked && (
                <div>
                  <p>Nombre del archivo: {selectedFile.name}</p>
                </div>
              )}
              {
                isFilePicked && (
                  <div>
                    <button className="btn btn-success" onClick={handleSubmission}>Agregar</button>
                  </div>
                )
              }
          </div>
        </div>
      </section>
    </div>
  );
}