

  export const AlumnosFormulariosScreen = () => {

    // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

    return (
      <div>
        <section id="forms__home">
          <h1 id="forms__title">Formularios</h1>
        </section>
        <section id="forms__board">
          <div id="forms__board-week">
            <div id="forms__board-padding">
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F1</h4>
                    <p className="forms__board-text">Justificación de inasistencia</p>
                    {/* TODO: onClick=handleClick */}
                    <button className="forms__board-button-download">Descargar F1</button>
                </div>
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F2</h4>
                    <p className="forms__board-text">Retiro anticipado</p>
                    <button className="forms__board-button-download">Descargar F2</button>
                </div>
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F3</h4>
                    <p className="forms__board-text">Justificación de enfermedad</p>
                    <button className="forms__board-button-download">Descargar F3</button>
                </div>
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F4</h4>
                    <p className="forms__board-text">Matriculación</p>
                    <button className="forms__board-button-download">Descargar F4</button>
                </div>
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F5</h4>
                    <p className="forms__board-text">Reglamento</p>
                    <button className="forms__board-button-download">Descargar F5</button>
                </div>
                <div className="forms__board-form-container">
                    <h4 className="forms__board-form">Formulario F6</h4>
                    <p className="forms__board-text">Ficha médica</p>
                    <button className="forms__board-button-download">Descargar F6</button>
                </div>
            </div>
          </div>
        </section>
      </div>
    );
  }