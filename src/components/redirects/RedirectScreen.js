import { Link } from "react-router-dom";

export const RedirectScreen = () => {
  return (
    <div className="redirect__container">
        <h2>¿A dónde queres ir?</h2>
        <Link to="/alumnos/alumnos">Alumnos</Link>
        <Link to="/profesores">Profesores</Link>
        <p>(esta página no se va a implementar, solo desarrollo)</p>
    </div>
  )
}
