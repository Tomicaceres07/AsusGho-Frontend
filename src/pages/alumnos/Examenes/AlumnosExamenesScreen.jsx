

export const AlumnosExamenesScreen = () => {

    // In a future, I'll do a get petition to API, and I'll receive a list of the exams, so I can do a ul.map method to list them all.

    return (
        <div>
            <section id="exams__home">
                <h1 id="exams__title">Exámenes</h1>
            </section>
            <section id="exams__board">
                <div id="exams__board-week">
                    {/* TODO: Consume API and fill this Dynamiclly */}
                    <div id="exams__board-padding">
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Lengua</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Matematica</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Historia</h4>
                            <p className="exams__board-exam">EXAMEN 23/07 - Rev. Industrial</p>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Geografia</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Filosofia</h4>
                            <p className="exams__board-exam">EXAMEN 14/07 - Freud</p>
                            <p className="exams__board-exam">EXAMEN 25/07 - Aristóteles</p>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Arte</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Deportes</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Biologia</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Informatica</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Derecho</h4>
                            <p className="exams__board-exam">EXAMEN 14/07 - Derecho penal</p>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Estadistica</h4>
                        </div>
                        <div className="exams__board-subject-container">
                            <h4 className="exams__board-subject">Economia</h4>
                            <p className="exams__board-exam">EXAMEN 18/08 - Teoría econmómica</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}