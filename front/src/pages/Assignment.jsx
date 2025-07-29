import {useState, useEffect} from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';

function Assignment() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Fetch assignments on mount
    useEffect(() => {
        setLoading(true);
        fetch(import.meta.env.VITE_WACDO_BACK_URL + `/assignments`)
            .then((response) => response.json())
            .then((response) => {
                setAssignments(response.member);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            header: 'Utilisateur',
            render: (assignment) => `${assignment.employee.firstName} ${assignment.employee.lastName}`
        },
        {
            header: 'Restaurant',
            render: (assignment) => assignment.restaurant.name
        },
        {
            header: 'Poste',
            render: (assignment) => assignment.jobTitle.name
        },
        {
            header: 'Période',
            render: (assignment) =>
                `${new Date(assignment.startAt).toLocaleDateString('fr-FR')} - ${new Date(assignment.endAt).toLocaleDateString('fr-FR')}`
        }
    ];

    const renderActions = () => (
        <>
            <Button icon={faEdit} color="warning">Modifier</Button>
            <Button icon={faTrash} color="danger">Supprimer</Button>
        </>
    );

    const filters = [
        {
            defaultOption: "Tous les restaurants",
            options: [
                {value: "centre", label: "Wacdo Centre"},
                {value: "nord", label: "Wacdo Nord"},
                {value: "sud", label: "Wacdo Sud"}
            ]
        }
    ];

    return (
        <main role="assignment">
            <section>
                <PageHeader
                    title="Gestion des Affectations"
                    actionButton={<Button icon={faPlus} color="success">Nouvelle affectation</Button>}
                />

                <section>
                    <SearchBar
                        placeholder="Rechercher par utilisateur..."
                        filters={filters}
                    />

                    {loading ? (
                        <Loading message="Chargement des affectations..." />
                    ) : (
                        <>
                            <DataTable
                                columns={columns}
                                data={assignments}
                                renderActions={renderActions}
                            />

                            <Pagination
                                currentCount={assignments ? assignments.length : 0}
                                totalCount={assignments ? assignments.length : 0}
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