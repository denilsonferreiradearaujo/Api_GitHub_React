import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { FaArrowLeft } from "react-icons/fa";

import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BackButton, IssuesList, Pagination, FilterList } from "./styles";

export default function Repositorio() {
    const { repositorio } = useParams();
    const listFilter = [
        { state: 'all', label: 'All', active: true },
        { state: 'open', label: 'Open', active: false },
        { state: 'closed', label: 'Closed', active: false },
    ]
    const [repo, setRepo] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setfilters] = useState(listFilter);
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(() => {
        async function load() {
            const nomeRepo = decodeURIComponent(repositorio);
            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filters.find(f => f.active).state,
                        per_page: 5,
                    }
                })
            ]);
            setRepo(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }
        load();
    }, [repositorio]);

    useEffect(() => {
        async function loadIssue() {
            const nomeRepo = decodeURIComponent(repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filters[filterIndex].state,
                    page,
                    per_page: 5,
                },
            });
            setIssues(response.data)
        }

        loadIssue()

    }, [page, filterIndex])

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    function handleFilter(index) {
        setFilterIndex(index);
        setPage(1);
    }

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft />
            </BackButton>
            <Owner>
                <img
                    src={repo.owner?.avatar_url}
                    alt={repo.owner?.login}
                />
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>

            <FilterList active={filterIndex}>
                {filters.map((filterItens, index) => (
                    <button
                        type="button"
                        key={filterItens.label}
                        onClick={() => handleFilter(index)}
                    >
                        {filterItens.label}
                    </button>

                ))}
            </FilterList>

            {/* <IssuesList>
                <h2>Issues</h2>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>

                            <p>{issue.user.login}</p>

                        </div>
                    </li>
                ))}
                    
            </IssuesList> */}

            <DragDropContext
                onDragEnd={(result) => {
                    if (!result.destination) return;

                    const reorderedIssues = Array.from(issues);
                    const [removed] = reorderedIssues.splice(result.source.index, 1);
                    reorderedIssues.splice(result.destination.index, 0, removed);

                    setIssues(reorderedIssues);
                }}
            >
                <Droppable droppableId="issues">
                    {(provided) => (
                        <IssuesList ref={provided.innerRef} {...provided.droppableProps}>
                            {issues.map((issue, index) => (
                                <Draggable key={issue.id} draggableId={String(issue.id)} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                                            <div>
                                                <strong>
                                                    <a href={issue.html_url}>{issue.title}</a>
                                                    {issue.labels.map(label => (
                                                        <span key={label.id}>{label.name}</span>
                                                    ))}
                                                </strong>
                                                <p>{issue.user.login}</p>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </IssuesList>
                    )}
                </Droppable>
            </DragDropContext>

            <Pagination>
                <button
                    type="button"
                    onClick={() => handlePage('back')}
                    disabled={page < 2}
                >
                    Back
                </button>

                <span>Page {page}</span>

                <button type="button" onClick={() => handlePage('next')}>Next</button>
            </Pagination>
        </Container>
    )

}