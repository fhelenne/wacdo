import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import {faPlus, faEdit, faTrash} from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'
import {notify} from "../utils/notify.js";

function Assignment() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    document.title = `Wacdo : Affectations`;
    // Helpers to safely read nested values that may be objects or IRI strings
    const isObject = (value) => value !== null && typeof value === 'object';
    const getEmployeeFullName = (row) => {
        if (!row || !row.employee || !isObject(row.employee)) return '';
        const firstName = row.employee.firstName || '';
        const lastName = row.employee.lastName || '';
        return `${firstName} ${lastName}`.trim();
    };
    const getJobTitleName = (row) => {
        if (!row || !row.jobTitle || !isObject(row.jobTitle)) return '';
        return row.jobTitle.name || '';
    };
    const getRestaurantName = (row) => {
        if (!row || !row.restaurant || !isObject(row.restaurant)) return '';
        return row.restaurant.name || '';
    };

    // Format date to local format
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Fetch assignments on mount
    useEffect(() => {
        fetchAssignments();
    }, []);

    // Fetch assignments method
    const fetchAssignments = () => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/assignments`)
            .then((response) => response.json())
            .then((response) => {
                const items = Array.isArray(response.member)
                    ? response.member
                    : Array.isArray(response['hydra:member'])
                        ? response['hydra:member']
                        : [];
                setAssignments(items);
                setLoading(false);
            })
            .catch((error) => {
                // L'erreur a déjà été affichée par fetchWithJWT
                console.error('Erreur lors du chargement des affectations:', error);
                setLoading(false);
            });
    };

    // Handle delete assignment
    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette affectation ?")) {
            fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/assignments/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    // Remove the deleted assignment from the state
                    notify.success('Affectation supprimée avec succès', {});
                    setAssignments(assignments.filter(assignment => assignment.id !== id));
                })
                .catch((error) => {
                    // L'erreur a déjà été affichée par fetchWithJWT
                    console.error('Erreur lors de la suppression:', error);
                });
        }
    };

    const columns = [
        {
            header: 'Id',
            render: (row) => row.id
        },
        {
            header: 'Collaborateur',
            render: (row) => getEmployeeFullName(row)
        },
        {
            header: 'Poste',
            render: (row) => getJobTitleName(row)
        },
        {
            header: 'Restaurant',
            render: (row) => getRestaurantName(row)
        },
        {
            header: 'Date de début',
            render: (row) => formatDate(row.startAt)
        },
        {
            header: 'Date de fin',
            render: (row) => formatDate(row.endAt)
        },
    ];

    const renderActions = (assignment) => (
        <>
            <Button
                icon={faEdit}
                color="warning"
                to={`/assignments/edit/${assignment.id}`}
            >
                Modifier
            </Button>
            <Button
                icon={faTrash}
                color="danger"
                onClick={() => handleDelete(assignment.id)}
            >
                Supprimer
            </Button>
        </>
    );

    return (
        <main role="assignments">
            <section>
                <PageHeader
                    title="Gestion des Affectations"
                    actionButton={<Button icon={faPlus} color="success" to={'/assignments/add/'}>Ajouter une
                        affectation</Button>}
                />

                <section>
                    <SearchBar placeholder="Rechercher une affectation..."/>
                    {loading ? (
                        <Loading message="Chargement des affectations..."/>
                    ) : (
                        <>
                            <DataTable
                                columns={columns}
                                data={assignments}
                                renderActions={renderActions}
                            />
                            <Pagination
                                currentCount={assignments.length}
                                totalCount={assignments.length}
                                itemType="affectations"
                            />
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}

export default Assignment;