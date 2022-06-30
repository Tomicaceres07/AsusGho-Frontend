

  export const AlumnosPreviasScreen = () => {

    // In a future, I'll do a get petition to API, and I'll receive a list of the previous subjects, so I can do a ul.map method to list them all.

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
                <div className="previous__board-subject-container">
                    <h4 className="previous__board-subject">Lengua</h4>
                    {/* TODO: onClick=handleClick */}
                    <button className="previous__board-button-download">Descargar Temario y Fechas</button>
                </div>
                <div className="previous__board-subject-container">
                    <h4 className="previous__board-subject">Matematica</h4>
                    <button className="previous__board-button-download">Descargar Temario y Fechas</button>
                </div>
                <div className="previous__board-subject-container">
                    <h4 className="previous__board-subject">Historia</h4>
                    <button className="previous__board-button-download">Descargar Temario y Fechas</button>
                </div>
                <div className="previous__board-subject-container">
                    <h4 className="previous__board-subject">Informatica</h4>
                    <button className="previous__board-button-download">Descargar Temario y Fechas</button>
                </div>
                <div className="previous__board-subject-container">
                    <h4 className="previous__board-subject">Geografia</h4>
                    <button className="previous__board-button-download">Descargar Temario y Fechas</button>
                </div>
            </div>
          </div>
        </section>
      </div>
    );
  }