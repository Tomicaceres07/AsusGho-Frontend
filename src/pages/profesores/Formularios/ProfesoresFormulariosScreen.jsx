import { useState, useEffect } from "react";
import { saveAs } from 'file-saver'
const axios = require('axios').default;

export const ProfesoresFormulariosScreen = () => {
  
  const [forms, setForms] = useState();
  
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  
  //  This is for Read PDFs
  useEffect(() => {
    axios.post('/api/pdf/arrread', {"type":false})
        .then(({data}) => {
          setForms(data.element);
          console.log(data.element);
          console.log(data.element.length);
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
        "type": false
      }
    })

    const { data } = petition;
    const id = data.id[0][0];

    return id;
  }
  
  async function getIdForm() {

    const id = await processIdForm()

    
    console.log(id);

    return id;
  }

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
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

    window.location.reload();
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


  return (
    <div>
      <section id="teacher__forms__home">
        <h1 id="teacher__forms__title">Formularios</h1>
      </section>
      <section id="teacher__forms__board">
        <div id="teacher__forms__board-week">
          <div id="teacher__forms__board-padding">
            {
                forms && (
                  (forms.length !== 0) 
                  ? (forms.map( (item, index) => (
                  <div className="teacher__forms__board-form-container" key={index}>
                    <h4 className="teacher__forms__board-form">Formulario F{item.id}</h4>
                    <p className="teacher__forms__board-text">{item.name}</p>
                    <button className="teacher__forms__board-button-download" onClick={() => onDownload(item.id)}>Descargar F{item.id}</button> <br />  
                    <button className="btn btn-danger" onClick={() => onDelete(item.id)}>Borrar</button>
                  </div>
                  )))
                  : <h1>No hay PDFs CRACK</h1>
                )
            }
          </div>
          <div className='mw-100'>
              {/* <label htmlFor="teacher__forms__input-file">Choose a File</label> */}
              <input type="file" id="teacher__forms__input-file" name="file" onChange={changeHandler}  className='mw-100' />
              {isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Select a file to show details</p>
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