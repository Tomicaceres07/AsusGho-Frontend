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

    useEffect(() => {
        axios.post('/api/division_year/course', {
            "grade": grade,
            "division": division,
            "id_p": user.id
        })
        .then(({data}) => {
            // console.log(data.courses.length);
            setCourses(data.courses);
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

        /* if (subj + 1 === subjects.length) {
            clearInterval();
        } */
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // TODO: do a for and add one by one the subjects to student
        if (subjects.length >= 1) {
            document.getElementById("teacher__perfil__error").hidden = true;
            // console.log(subjects)
            // I must send: user.id and subjects[i]
            // Do the for
            subjects.forEach(subj => {
                const res = addPersonRoll(subj)
                console.log(res);
                // console.log("foreach", subj)
                // setInterval(() => {
                    
                // }, 2000);
            })

            navigate('/profesores/cursos', {
                replace: true
            });

        } else {
            document.getElementById("teacher__perfil__error").hidden = false;
        }
    }
    
    return (
        <div>
            <section id="teacher__perfil__home">
                <h1 id="teacher__perfil__home-title">Inscripciones</h1>
            </section>
            <section id="teacher__perfil__board">
                <div id="teacher__perfil__board-week">
                    <div id="teacher__perfil__board-padding">
                        <h2 className="pt-3">Hola, {user && user.name}</h2>
                        <h2>Inscripción a materias</h2>
                        <form id="teacher__perfil__form" onSubmit={handleSubmit(onSubmit)}>
                            {/* TODO: Change id for class */}
                            <h4 id="teacher__perfil__title">Seleccione el año</h4>
                            <select name="grade" {...register('grade')} onChange={handleChangeGrade} id="teacher__perfil__dropdown" className="w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el año --</option> */}
                                <option value={1}>1ero</option>
                                <option value={2}>2do</option>
                                <option value={3}>3ero</option>
                                <option value={4}>4to</option>
                                <option value={5}>5to</option>
                                <option value={6}>6to</option>
                            </select>
                            {/* TODO: Change id for class */}
                            <h4 id="teacher__perfil__title">Seleccione el curso</h4>
                            <select name="division" {...register('division')} onChange={handleChangeDivision} id="teacher__perfil__dropdown" className="w-100 mb-2 input">
                                {/* <option value="0">-- Seleccione el curso --</option> */}
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="c">C</option>
                            </select>
                            {
                                (courses && courses.length >= 1)
                                    ? courses.map( (item, index) => (
                                        <div key={index}>
                                            <input type="checkbox" name={item.id} onChange={handleChangeSubjects}/>
                                            <label htmlFor={item.id}>{item.name}</label>
                                        </div>
                                    ))
                                    : <p>No hay cursos</p>
                            }

                            <div id="teacher__perfil__error" className='text-danger' hidden>No seleccionaste ningún curso</div>
                            <button type="submit" className="display-block px-4 mx-auto mb-3 btn btn-primary" onClick={onSubmit}>Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
