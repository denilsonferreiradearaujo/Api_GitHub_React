import React, { useEffect, useState, useRef } from "react"
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa"
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles"

import api from "../../services/api"
import { Link } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function Main() {

    const [newRepo, setNewRepo] = useState("");
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    // buscar em localStorage

    const loaded = useRef(false);
    useEffect(() => {

        if (loaded.current) return;
        loaded.current = true;

        const repoStorage = localStorage.getItem('repos');

        if (repoStorage) {
            setRepositorios(JSON.parse(repoStorage));
        }
    }, []);

    // salvar em localStorage
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);


    function handleInputChenge(event) {
        setNewRepo(event.target.value);
        setAlert(null)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setLoading(true)

        try {

            if (newRepo === "") {
                // alert("Preencha o nome do repositório")
                throw new Error("Preencha o nome do repositório")
            }

            const response = await api.get(`repos/${newRepo}`);

            const hasRepo = repositorios.find(repo => repo.name === response.data.full_name);

            if (hasRepo) {
                // alert("Repositório duplicado")
                throw new Error("Repositório duplicado")
            }

            const data = {
                name: response.data.full_name,
            }

            setRepositorios([...repositorios, data])
            setNewRepo("");
        } catch (err) {
            setAlert(true)
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (repo) => {
        const find = repositorios.filter(r => r.name !== repo.name);
        setRepositorios(find);
    };

    // const handleDelete1 = useCallback((repo) => {
    //     const find = repositorios.filter(r => r.name !== repo.name);
    //     setRepositorios(find);
    // });

    // const handleSubmit = useCallback((event) => {
    //     event.preventDefault();

    //     async function submit() {
    //         if (newRepo == "") {
    //             alert("Preencha o nome do repositório")
    //             return
    //         }

    //         const response = await api.get(`repos/${newRepo}`);

    //         const data = {
    //             name: response.data.full_name
    //         }

    //         alert("Repositório adicionado!")
    //         setRepositorios([...repositorios, data])
    //         setNewRepo("");
    //     }

    //     submit();

    // }, [newRepo, repositorios]);

    return (
        <Container>
            <h1>
                <FaGithub />
                My repositories
            </h1>

            <Form onSubmit={handleSubmit} alertError={alert}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={handleInputChenge}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="#fff" size={18} />
                    ) : (
                        <FaPlus className="plusIcons" color="#fff" />
                    )}

                </SubmitButton>

            </Form>

            {/* <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo)}>
                                <FaTrash />
                            </DeleteButton>
                            {repo.name}</span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List> */}

            <DragDropContext
                onDragEnd={(result) => {
                    if (!result.destination) return;

                    const reorderedRepos = Array.from(repositorios);
                    const [removed] = reorderedRepos.splice(result.source.index, 1);
                    reorderedRepos.splice(result.destination.index, 0, removed);

                    setRepositorios(reorderedRepos);
                }}
            >
                <Droppable droppableId="repos">
                    {(provided) => (
                        <List ref={provided.innerRef} {...provided.droppableProps}>
                            {repositorios.map((repo, index) => (
                                <Draggable key={repo.name} draggableId={repo.name} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <span>
                                                <DeleteButton onClick={() => handleDelete(repo)}>
                                                    <FaTrash />
                                                </DeleteButton>
                                                {repo.name}
                                            </span>
                                            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                                <FaBars size={20} />
                                            </Link>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>

        </Container>
    )

}