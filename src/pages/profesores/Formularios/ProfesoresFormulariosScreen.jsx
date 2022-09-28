import { useState, useEffect } from "react";
import { saveAs } from 'file-saver'
const axios = require('axios').default;

  export const ProfesoresFormulariosScreen = () => {

    // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

    //  This is for Read PDFs
    const [forms, setForms] = useState();

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
                      <button className="teacher__forms__board-button-download" onClick={() => onDownload(item.id)}>Descargar F{item.id}</button>
                    </div>
                    )))
                    : <h1>No hay PDFs CRACK</h1>
                  )
              }
            </div>
          </div>
        </section>
      </div>
    );
  }