import { useState } from 'react';


const axios = require('axios').default;

export const AlumnosPreviasScreen = () => {

  // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

  // This is for read PDFs
  /* const [forms, setForms] = useState();

  useEffect(() => {
    axios.post('/api/pdf/arrread', {"type":false})
        .then(({data}) => {
            setForms(data.element);
            console.log(data.element);
        })
        .catch((err) => {
            console.log(err);
    })
  }, []) */

  // This is to upload a pdf
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  // This is for Download PDFs
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
  };

  return (
    <div>
      <section id="previous__home">
        <h1 id="previous__title"><span id="previous__title-p1">Examenes</span><span id="previous__title-p2">Complementarios</span></h1>
        <h2 id="previous__subtitle">Periodo 2021 / 2022</h2>
      </section>
      <section id="previous__board">
        <h2 id="previous__board-title">Materias</h2>
        <div id="previous__board-week">
          <div id="previous__board-padding">
              {/* <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">Lengua</h4>
                  <button className="previous__board-button-download" onClick={onDownload}>Descargar Temario y Fechas</button>
              </div>
              <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">Matematica</h4>
                  <button className="previous__board-button-download" onClick={onDownload}>Descargar Temario y Fechas</button>
              </div>
              <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">Historia</h4>
                  <button className="previous__board-button-download" onClick={onDownload}>Descargar Temario y Fechas</button>
              </div>
              <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">Informatica</h4>
                  <button className="previous__board-button-download" onClick={onDownload}>Descargar Temario y Fechas</button>
              </div>
              <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">Geografia</h4>
                  <button className="previous__board-button-download" onClick={onDownload}>Descargar Temario y Fechas</button>
              </div> */}
              {/* <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">TEST</h4>
                  <button className="previous__board-button-download" onClick={onSendPDF}>Mandar PDF</button>
              </div> */}
              {/* This is to upload a pdf */}
              <div className='mw-100'>
                <input type="file" name="file" onChange={changeHandler}  className='mw-100'/>
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
              <div>
                <button onClick={handleSubmission}>Submit</button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}