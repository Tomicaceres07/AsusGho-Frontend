

export const AlumnosFaltasScreen = () => {
    return (
        <div>
            <section id="absences__home">
                <h1 id="absences__title">Inasistencias</h1>
                <h2 id="absences__subtitle">Mariano Puertas</h2>
            </section>
            <section id="absences__board">
                <h2 id="absences__board-title">Faltas</h2>
                <div id="absences__board-week">
                    <div id="absences__board-padding">
                        <div className="absences__board-container absences__board-unjustified">
                            <p className="absences__board-day">23/07</p>
                            <p className="absences__board-absence">Injustificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">15/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">18/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container absences__board-unjustified">
                            <p className="absences__board-day">19/08</p>
                            <p className="absences__board-absence">Injustificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">20/08</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                        <div className="absences__board-container">
                            <p className="absences__board-day">07/10</p>
                            <p className="absences__board-absence">Justificada</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}