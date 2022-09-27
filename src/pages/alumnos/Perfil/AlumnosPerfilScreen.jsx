import { AuthContext } from 'context';
import React, { useContext, useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
const axios = require('axios').default;

export const AlumnosPerfilScreen = () => {

    const { register, handleSubmit } = useForm();
    const [grade, setGrade] = useState(1);
    const [division, setDivision] = useState("a");
    const [courses, setCourses] = useState();
    const [subjects, setSubjects] = useState([])

    const { authState } = useContext( AuthContext );
    const { user } = authState;

    useEffect(() => {
        axios.post('/api/division_year/course', {
            "grade": grade,
            "division": division,
            "id_s": user.id
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
        // setDivision(event.target.value);
        // console.log("cambié")
        // console.log(courses.length)
        // console.log(event)
        const id = parseInt(event.target.name)
        // console.log(event.target.checked)
        const isFounded = subjects.find(subject => subject === id);
        // console.log(isFounded);
        if (!isFounded && event.target.checked) {
            /* setSubjects(...subjects, {
                id_c: event.target.id,
                id_s: user.id
            }) */
            setSubjects([...subjects, id]);
        } else if(isFounded && !event.target.checked) {
            setSubjects(subjects.filter(subject => subject !== id));
        }
        
        /* if (subjects.length >= 0) {
            document.getElementById('register__submit').disabled = false;
        } else {
            document.getElementById('register__submit').disabled = true;
        } */

    };  

    const addStudentRoll = async(subj) => {
        const petition = await axios.post('/api/add/student_roll', {
            "id_c": subj,
            "id_s": user.id
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
            document.getElementById("perfil__error").hidden = true;
            // console.log(subjects)
            // I must send: user.id and subjects[i]
            // Do the for
            subjects.forEach(subj => {
                const res = addStudentRoll(subj)
                console.log(res);
                // console.log("foreach", subj)
                // setInterval(() => {
                    
                // }, 2000);
            })



        } else {
            document.getElementById("perfil__error").hidden = false;
        }
    }
    
    return (
        <div className="perfil__container">
            <h2>Hola, {user && user.name}</h2>
            <h2>Inscripción a materias</h2>
            <form id="perfil__form" onSubmit={handleSubmit(onSubmit)}>
                <h4 id="perfil__title">Seleccione el año</h4>
                <select name="grade" {...register('grade')} onChange={handleChangeGrade} id="perfil__dropdown" className="w-100 mb-2 input">
                    {/* <option value="0">-- Seleccione el año --</option> */}
                    <option value={1}>1ero</option>
                    <option value={2}>2do</option>
                    <option value={3}>3ero</option>
                    <option value={4}>4to</option>
                    <option value={5}>5to</option>
                    <option value={6}>6to</option>
                </select>
                <h4 id="perfil__title">Seleccione el curso</h4>
                <select name="division" {...register('division')} onChange={handleChangeDivision} id="perfil__dropdown" className="w-100 mb-2 input">
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

                {
                    (subjects) && <p>{subjects}</p>
                }
                <div id="perfil__error" className='text-danger' hidden>No seleccionaste ningún curso</div>
                <button type="submit" id="register__submit" className="display-block w-100" onClick={onSubmit}>Enviar</button>
            </form>
        </div>
    )
}
