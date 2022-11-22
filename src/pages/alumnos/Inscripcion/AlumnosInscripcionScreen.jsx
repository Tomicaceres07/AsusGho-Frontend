import Spinner from 'react-bootstrap/Spinner';
import { AuthContext } from 'context';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;

export const AlumnosInscripcionScreen = () => {

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
            "id_s": user.id
        })
        .then(({data}) => {
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

    const addStudentRoll = async(subj) => {
        const petition = await axios.post('/api/add/student_roll', {
            "id_c": subj,
            "id_s": user.id
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

        return petition;

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (subjects.length >= 1) {
            document.getElementById("student__inscription__error").hidden = true;
            subjects.forEach(subj => {
                const res = addStudentRoll(subj)
            })

            navigate('/alumnos/materias', {
                replace: true
            });


        } else {
            document.getElementById("student__inscription__error").hidden = false;
        }
    }
    
    return (
        <div>
            <section className="student__inscription__home">
                <h1 className="student__inscription__home-title">Inscripciones</h1>
            </section>
            <section className="student__inscription__board">
                <div className="student__inscription__board-week">
                    <div className="student__inscription__board-padding">
                        <h2 className="pt-3">Hola, {user && user.name}</h2>
                        <h2>Inscripción a materias</h2>
                        <form className="student__inscription__form text-center" onSubmit={handleSubmit(onSubmit)}>
                            <h4 className="student__inscription__title">Seleccione el año</h4>
                            <select name="grade" {...register('grade')} onChange={handleChangeGrade} className="student__inscription__dropdown w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el año --</option> */}
                                <option value={1}>1ero</option>
                                <option value={2}>2do</option>
                                <option value={3}>3ero</option>
                                <option value={4}>4to</option>
                                <option value={5}>5to</option>
                                <option value={6}>6to</option>
                            </select>
                            <h4 className="student__inscription__title">Seleccione el curso</h4>
                            <select name="division" {...register('division')} onChange={handleChangeDivision} className="student__inscription__dropdown w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el curso --</option> */}
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                            {
                                !isLoading
                                ?   (
                                    (courses && courses.length >= 1)
                                        ? courses.map( (item, courseIndex) => (
                                            <div className='text-start student__inscription__courses-container' key={courseIndex}>
                                                <label htmlFor={item.id}>
                                                    {item.name}
                                                    <input type="checkbox" id={item.id} name={item.id} onChange={handleChangeSubjects}/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        ))
                                        : <p>No hay cursos</p>
                                )
                                :   (
                                    <Spinner animation="border" variant="light" />
                                )
                            }

                            <div id='student__inscription__error' className="text-danger" hidden>No seleccionaste ningún curso</div>
                            <button type="submit" className="display-block px-4 mx-auto mb-3 mt-3 btn btn-primary" onClick={onSubmit}>Inscribirse</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
