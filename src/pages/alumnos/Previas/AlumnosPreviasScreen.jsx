import { useState, useEffect } from 'react';


const axios = require('axios').default;

export const AlumnosPreviasScreen = () => {

  // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

  const [forms, setForms] = useState();

  useEffect(() => {
    axios.post('/api/pdf/arrread', {"type":false})
        .then(({data}) => {
            setForms(data.element);
            console.log(data.element);
        })
        .catch((err) => {
            console.log(err);
    })
  }, [])
  
  

  const onDownload = (id) => {

    console.log(id);

    axios.post("/api/message/pdf/oneread", 
    {
      responseType: 'arraybuffer',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
      },
      body: {
        "id": id
      } 
    })
    .then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'formulario.pdf'); //or any other extension
      document.body.appendChild(link);
      console.log(link);
      link.click();
    })
    .catch((err) => {
      console.log(err);
    })

    /* axios.get("http://192.168.60.43:5000/dw",
      {
          responseType: 'arraybuffer',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
          }
      })
      .then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log(url);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf'); //or any other extension
          document.body.appendChild(link);
          console.log(link);
          link.click();
      })
      .catch((error) => console.log(error)); */

  }

  const onSendPDF = () => {
    console.log("onSendPDF")
  }

  {/* This is to upload a pdf */}
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    console.log("handleSubmission")
    const formData = new FormData();

    formData.append('a', selectedFile);
    // formData.append('name', selectedFile.name);
    // console.log(selectedFile.name);

    axios.post('http://192.168.60.43:5000/', formData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
    })

    /* fetch(
      'http://192.168.60.43:5000/',
      {
        headers: {mode: 'cors'},
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });*/
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
              {/* TODO: Forms.map */}
              {
                  forms && forms.map( (item, index) => (
                  <div className="previous__board-subject-container" key={index}>
                      <h4 className="previous__board-subject">{item.name}</h4>
                      {/* TODO: onClick=handleClick */}
                      <button className="previous__board-button-download" onClick={onDownload(item.id)}>Descargar Temario y Fechas</button>
                  </div>
      
                  ))
              }
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
              <div className="previous__board-subject-container">
                  <h4 className="previous__board-subject">TEST</h4>
                  <button className="previous__board-button-download" onClick={onSendPDF}>Mandar PDF</button>
              </div>
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