import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react";
import { saveAs } from 'file-saver'
const axios = require('axios').default;

  export const AlumnosFormulariosScreen = () => {

    // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

    //  This is for Read PDFs
    const [forms, setForms] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true); 
      // type true is for alumns
      axios.post('/api/pdf/arrread', {"type":true})
          .then(({data}) => {
            setForms(data.element);
            console.log(data.element);
            console.log(data.element.length);
            setIsLoading(false); 
          })
          .catch((err) => {
            console.log(err);
          })
    }, [])


    // This is for Download PDFs
    async function onDownload(id) {
      const { data } = await getForm(id)
      const blob = new Blob([data], { type: 'application/pdf' })
      saveAs(blob, `Formulario F${id}.pdf`)
    }
    
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


    return (
      <div>
        <section id="student__forms__home">
          <h1 id="student__forms__title">Formularios</h1>
        </section>
        <section id="student__forms__board">
          <div id="student__forms__board-week">
            <div id="student__forms__board-padding">
              {
                  !isLoading
                  ?   (forms && (
                        (forms.length !== 0) 
                        ? (forms.map( (item, index) => (
                        <div className="student__forms__board-form-container" key={index}>
                          <h4 className="student__forms__board-form">Formulario F{item.id}</h4>
                          <p className="student__forms__board-text">{item.name}</p>
                          <button className="student__forms__board-button-download" onClick={() => onDownload(item.id)}>Descargar F{item.id}</button>
                        </div>
                        )))
                        : <h2>No hay formularios</h2>
                      )
                  )
                  :   (
                    <Spinner animation="border" variant="light" />
                  )
              }
            </div>
          </div>
        </section>
      </div>
    );
  }