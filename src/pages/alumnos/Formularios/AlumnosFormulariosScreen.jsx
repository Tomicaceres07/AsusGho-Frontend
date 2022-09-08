import { useState, useEffect } from "react";
import { saveAs } from 'file-saver'
const axios = require('axios').default;

  export const AlumnosFormulariosScreen = () => {

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

    async function printTickets(id) {
      const { data } = await getTicketsPdf(id)
      const blob = new Blob([data], { type: 'application/pdf' })
      saveAs(blob, `Formulario F${id}.pdf`)
    }
    
    async function getTicketsPdf(id) {
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

    const onDownload = (id) => {
      // id is in string

      console.log(id);

      axios({
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
      .then((response) => {
        console.log(response);
        // const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        // console.log(url);
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', `Formulario F${id}.pdf`); //or any other extension
        // document.body.appendChild(link);
        // console.log(link);
        // link.click();
      })
      .catch((err) => {
        console.log(err);
      })

      /* axios.post("/api/message/pdf/oneread", 
      {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/pdf'
        }
      }, {"id": id})
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
      }) */
  
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

    return (
      <div>
        <section id="forms__home">
          <h1 id="forms__title">Formularios</h1>
        </section>
        <section id="forms__board">
          <div id="forms__board-week">
            <div id="forms__board-padding">
              {
                  forms && forms.map( (item, index) => (
                  <div className="forms__board-form-container" key={index}>
                    <h4 className="forms__board-form">Formulario F{item.id}</h4>
                    <p>El id es {item.id}</p>
                    <p className="forms__board-text">{item.name}</p>
                    <button className="forms__board-button-download" onClick={() => printTickets(item.id)}>Descargar F{item.id}</button>
                  </div>
                  ))
              }
            </div>
          </div>
        </section>
      </div>
    );
  }