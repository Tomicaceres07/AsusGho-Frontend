import { useForm } from "react-hook-form";
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context';
import React, { useContext, useEffect, useState } from 'react';
const axios = require('axios').default;


export const ProfesoresCursosScreen = () => {

    // Get user from Context
    const { authState } = useContext( AuthContext );
    const { user } = authState;
    
    // States years and classes
    const [resApi, setResApi] = useState();
    const [years, setYears] = useState([]);
    const [classes, setClasses] = useState();
    
    // Form upload
    const { register, handleSubmit } = useForm();

    const [grade, setGrade] = useState();
    const [subject, setSubject] = useState();
    const [title, setTitle] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('/api/read/person_roll', {'id_p': user.id})
        .then(({data}) => {
            setResApi(data.class);
            setYears(Object.keys(data.class))
            console.log(Object.keys(data.class))

            // setGrade(Object.keys(data.class)[0]);

            setClasses(Object.values(data.class));
            console.log(Object.values(data.class));

            // setSubject(Object.values(data.class)[0][0].name);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [user.id])
    

    const redirect = () => {
        navigate('/profesores/perfil', {
            replace: true
        });
    }

    useEffect(() => {
        console.log(title)
    }, [title])
    

    const hasGrade = () => {
        let res
        (grade !== undefined)
            ? (grade !== "0")
                ? res = true
                : res = false
            : res = false

        return res
    }

    const hasSubject = () => {
        let res
        (subject !== undefined)
            ? (subject !== "0")
                ? res = true
                : res = false
            : res = false

        return res
    }

    const hasTitle = () => {
        let res
        (title !== "")
            ? res = true
            : res = false

        return res
    }

    // Form to Upload PDF depending grade and class
    const handleChangeGrade = event => {
        setGrade(event.target.value);
        setSubject("0");
    };  

    const handleChangeSubject = event => {
        setSubject(event.target.value);
    };  

    // This is for read PDF
    const getPdfClass = (p_id) => {
        const id = p_id.toString();
        
        axios.post('/api/id/course', {'id_c': id})
        .then(({data}) => {
            if (data.activities.length >= 1) {
                console.log("tiene algo")
                data.activities.map((item, index) => {

                    console.log(item.pdf_id, ' ', item.title);
                })
            }
            console.log(data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // This is for Upload PDFs
    const processIdActivity = async () => {
        // TODO: recieve the id_c by parameter
        const petition = await axios({
        method: 'post',
        url: "/api/add/activity",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "id_c": id,
            "title": title
        }
        })

        const { data } = petition;
        const id = data.id[0][0];

        return id;
    }
    
    async function getIdActivity() {

        const id = await processIdActivity()

        
        console.log(id);

        return id;
    }

    const changeHandler = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const getIdCourse = async(grade, subject) => {
        // const grade = Array.from(grade)[0];
        // console.log(Array.from(grade)[0]);
        let id = ""
        years.map((item, index) => {
            classes[index].map((item, index) => {
                let gradeInString = item.grade.toString()
                if (grade === gradeInString+item.division && subject === item.name) {
                    id = item.id
                }
            })
        })

        return id
        /* Object.keys(resApi).map((item, index) => {
            console.log(item)
        })
        if(Object.keys(resApi).includes(grade)) {
            console.log("encontrado")
        } */
    }

    const onSubmit = async ({grade, subject}) => {
        console.log("onSubmit");
        console.log(grade, subject);
        if (grade !== undefined && subject !== undefined) {
            const id = await getIdCourse(grade, subject);
            console.log(id);
        }
        // const id = await getIdActivity();
        // console.log(id);

        /* const formData = new FormData();

        formData.append('a', selectedFile);

        axios.post(`/api/pdf/insert/${id}`, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })

        window.location.reload(); */
    };

    return (
        <div>
            <section id="teacher__subjects__home">
                <h1 id="teacher__subjects__title">Materias</h1>
            </section>
            <section id="teacher__subjects__board">
                <div id="teacher__subjects__board-week">
                    <div id="teacher__subjects__board-padding" className='d-flex flex-column'>
                        {
                            years && years.length !== 0
                            ?   (
                                    years.map( (item, index) => (
                                        <div key={ index }  className="w-25 mx-auto">

                                            <h4 className='text-uppercase my-4'>{ item }</h4>
                                            <Accordion>
                                                {
                                                    classes[index].map((item, index) => (
                                                        <Accordion.Item key={index} eventKey={index} onClick={() => getPdfClass(item.id)}>
                                                            <Accordion.Header>{item.name}</Accordion.Header>
                                                            <Accordion.Body>
                                                                Contenido
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))
                                                }
                                            </Accordion>
                                        </div>
                                    ))
                                )
                            :   (
                                    <div>
                                        <h4 className="teacher__subjects__board-subject">No estás inscripto a ninguna materia</h4>
                                        <button onClick={ redirect }>Inscribirse</button>
                                    </div>
                                )
                        }
                        <hr />
                        <form id="teacher__subjects__form" onSubmit={handleSubmit(onSubmit)} className="w-25 mx-auto">
                            <h4 className="mt-2">Seleccione el año</h4>
                            <select name="grade" {...register('grade')} onChange={handleChangeGrade} id="teacher__subjects__dropdown" className="w-100 mb-2 input">
                                <option value="0">-- Seleccione el año --</option>
                                {
                                    years && years.length !== 0 && (
                                        years.map( (item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))
                                    )
                                }
                            </select>
                            {
                                grade && (
                                    <div>
                                        <h4>Seleccione la materia</h4>
                                        <select name="subject" {...register('subject')}  onChange={handleChangeSubject} id="teacher__subjects__dropdown" className="w-100 mb-2 input">
                                            <option value="0">-- Seleccione la materia --</option>
                                            {
                                                classes.map((item, index) => (
                                                    
                                                    item.map((item, index) => (
                                                        
                                                            (grade.includes(item.grade + item.division)) && <option key={index} value={item.name}>{item.name}</option>
                                                        
                                                    ))
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            }
                            <h4>Nombre de la actividad</h4>
                            <input type="text" className="w-100" value={title} onChange={(e) => setTitle(e.target.value)}/>

                            <input type="file" id="teacher__forms__input-file" name="file" onChange={changeHandler}  className='mw-100 mt-5' />
                            {isFilePicked && (
                                <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{' '}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                                </div>
                            )}
                            {
                                hasGrade() && hasSubject() && hasTitle() && isFilePicked && (
                                <div>
                                    <button className="btn btn-success" onClick={onSubmit}>Agregar</button>
                                </div>
                                )
                            }
                            <div id="teacher__subjects__error" className='text-danger' hidden>No seleccionaste ningún curso</div>
                        </form>
                        

                        {/*
                        <div className="teacher__subjects__board-subject-container">
                            <h4 className="teacher__subjects__board-subject">Historia</h4>
                            <p className="teacher__subjects__board-exam">EXAMEN 23/07 - Rev. Industrial</p>
                        </div>
                       */}
                    </div>
                </div>
            </section>
        </div>
    );
}