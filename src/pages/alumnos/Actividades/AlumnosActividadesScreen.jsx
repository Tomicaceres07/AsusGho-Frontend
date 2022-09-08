import { AuthContext } from "context";
import { useContext, useEffect, useState } from "react";
const axios = require('axios').default;



export const AlumnosActividadesScreen = () => {

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const [activities, setActivities] = useState();

    useEffect(() => {
        axios.post('/api/message/read', {'type': user.type})
        .then(({data}) => {
            setActivities(data.element);
            console.log(data.element);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.type])

    return (
        <div>
            <section id="activities__home">
                <h1 id="activities__title"><span id="activities__title-p1">Actividades</span><span id="activities__title-p2">Extracurriculares</span></h1>
            </section>
            <section id="activities__activities">
                <h2 id="activities__activities-title"><span id="activities__activities-title-p1">Calendario</span><span id="activities__activities-title-p2">De</span><span id="activities__activities-title-p3">Actividades</span></h2>
                <div id="activities__activities-container">
                    {/* <div className="activities__activities-carousel">
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                    </div> */}
                    {/* In a future, I'll consume the API and do a ul.map to list them all */}
                    <ul className="activities__activities-ul">
                        {
                            activities && activities.map( (item, index) => (
                                <li key={ index } className="activities__activities-name-activity">
                                    { item.date } - { item.text }
                                </li>
                            ))
                        }
                        {/* <li className="activities__activities-name-activity">Lunes 08/03 - Jura de la bandera</li>
                        <li className="activities__activities-name-activity">Miércoles 26/03 - Acto de abanderados</li>
                        <li className="activities__activities-name-activity">Miércoles 14/04 - Acto de Malvinas</li>
                        <li className="activities__activities-name-activity">Martes 27/04 - Entrega de uniformados</li>
                        <li className="activities__activities-name-activity">Jueves 08/05 - Jornada de entrenamiento</li>
                        <li className="activities__activities-name-activity">Lunes 12/05 - Visita del ministerio de seguridad</li>
                        <li className="activities__activities-name-activity">Viernes 30/05 - Aniversario del LMGP</li>
                        <li className="activities__activities-name-activity">Lunes 11/06 - Receso invernal</li>
                        <li className="activities__activities-name-activity">Miércoles 13/07 - Acto de San Martín</li>
                        <li className="activities__activities-name-activity">Martes 07/08 - Entrega de medallas de honor</li> */}
                    </ul>
                    {/* <div className="activities__activities-carousel">
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                        <img src="https://via.placeholder.com/100" className="activities__activities-img" alt="..." />
                    </div> */}
                </div>
            </section>
        </div>
    );
}