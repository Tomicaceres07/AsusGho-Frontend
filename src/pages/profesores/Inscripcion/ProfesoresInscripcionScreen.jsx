import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from 'context';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

export const ProfesoresInscripcionScreen = () => {

    const { register, handleSubmit } = useForm();
    const [grade, setGrade] = useState(1);
    const [division, setDivision] = useState("a");
    const [courses, setCourses] = useState();
    const [subjects, setSubjects] = useState([])

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); 
        axios.post('/api/division_year/course', {
            "grade": grade,
            "division": division,
            "id_p": user.id
        })
        .then(({data}) => {
            // console.log(data.courses.length);
            setCourses(data.courses);
            setIsLoading(false); 
        })
        .catch((err) => {
            console.log(err);
        })
    }, [grade, division, user.id])
    

    const handleChangeGrade = event => {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        setGrade(event.target.value);
        setSubjects([])
    };  
    
    const handleChangeDivision = event => {
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        setDivision(event.target.value);
        setSubjects([])
    };  
    
    const handleChangeSubjects = event => {
        const id = parseInt(event.target.name)

        const isFounded = subjects.find(subject => subject === id);

        if (!isFounded && event.target.checked) {
            setSubjects([...subjects, id]);
        } else if(isFounded && !event.target.checked) {
            setSubjects(subjects.filter(subject => subject !== id));
        }

    };  

    const addPersonRoll = async(subj) => {
        const petition = await axios.post('/api/add/person_roll', {
            "id_c": subj,
            "id_p": user.id
        })
        .then((res) => {
            console.log(res);
            // setCourses(data.courses);
        })
        .catch((err) => {
            console.log(err);
        })

        return petition;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: do a for and add one by one the subjects to teacher
        if (subjects.length >= 1) {
            document.getElementById("teacher__inscription__error").hidden = true;
            // Do the for
            subjects.forEach(subj => {
                const res = addPersonRoll(subj)
            })

            navigate('/profesores/cursos', {
                replace: true
            });

        } else {
            document.getElementById("teacher__inscription__error").hidden = false;
        }
    }
    
    return (
        <div>
            <section className="teacher__inscription__home">
                <h1 className="teacher__inscription__home-title">Inscripciones</h1>
            </section>
            <section className="teacher__inscription__board">
                <div className="teacher__inscription__board-week">
                    <div className="teacher__inscription__board-padding">
                        <h2 className="pt-3">Hola, {user && user.name}</h2>
                        <h2>Inscripción a materias</h2>
                        <form className="teacher__inscription__form text-center" onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="teacher__inscription__title">Seleccione el año</h4>
                            <select name="grade" {...register('grade')} onChange={handleChangeGrade} className="teacher__inscription__dropdown w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el año --</option> */}
                                <option value={1}>1ero</option>
                                <option value={2}>2do</option>
                                <option value={3}>3ero</option>
                                <option value={4}>4to</option>
                                <option value={5}>5to</option>
                                <option value={6}>6to</option>
                            </select>
                            <h4 className="teacher__inscription__title">Seleccione el curso</h4>
                            <select name="division" {...register('division')} onChange={handleChangeDivision} className="teacher__inscription__dropdown w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el curso --</option> */}
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                            {
                                !isLoading
                                ? (

                                (courses && courses.length >= 1)
                                    ? courses.map( (item, courseIndex) => (
                                        <div className='text-start teacher__inscription__courses-container' key={courseIndex}>
                                            <label htmlFor={item.id}>
                                                {item.name}
                                                <input type="checkbox" id={item.id} name={item.id} onChange={handleChangeSubjects}/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    ))
                                    : <p>No hay cursos</p>
                                )
                                : (
                                    <Spinner animation="border" variant="light" />
                                )
                            }

                            <div id="teacher__inscription__error" className='text-danger' hidden>No seleccionaste ningún curso</div>
                            <button type="submit" className="display-block px-4 mx-auto mb-3 mt-3 btn btn-primary" onClick={onSubmit}>Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
