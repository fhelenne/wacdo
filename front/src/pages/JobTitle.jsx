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

function JobTitle() {
    const [jobTitles, setJobTitles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `Wacdo Postes`;
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles')
            .then((response) => response.json())
            .then((response) => {
                setJobTitles(response.member);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce poste ?")) {
            fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/job_titles/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    notify.success('supprimé !', {})
                    setJobTitles(jobTitles.filter(job => job.id !== id)); // Update state after deletion
                })
                .catch((error) => notify.error(error, {}));
        }
    };

    const columns = [
        {
            header: 'Id',
            render: (job) => job.id
        },
        {header: 'Poste', key: 'name'}
    ];

    const renderActions = (job) => (
        <>
            <Button icon={faEdit} color="info" to={"/job-titles/detail/" + job.id}>Détail</Button>
            <Button icon={faEdit} color="warning" to={"/job-titles/edit/" + job.id}>Modifier</Button>
            <Button icon={faTrash} color="danger" onClick={() => handleDelete(job.id)}>Supprimer</Button>
        </>
    );

    const handleSearch = ({searchTerm, filters}) => {
        // Implement search logic
        console.log('Search Term:', searchTerm);
        console.log('Active Filters:', filters);
    };

    const searchFilters = [
        {
            name: 'department',
            label: 'Département',
            defaultOption: 'Tous les départements',
            options: [
                {value: 'sales', label: 'Ventes'},
                {value: 'marketing', label: 'Marketing'}
            ]
        }
    ];

    return (
        <main role="jobtitle">
            <section>
                <PageHeader
                    title="Gestion des Postes"
                    actionButton={<Button icon={faPlus} color="success" to={'/job-titles/add/'}>Ajouter un
                        poste</Button>}
                />

                <section>
                    <SearchBar
                        placeholder="Rechercher un poste..."
                        filters={searchFilters}
                        onSearch={handleSearch}
                    />
                    {loading ? (
                        <Loading message="Chargement des postes..."/>
                    ) : (
                        <>
                            <DataTable
                                columns={columns}
                                data={jobTitles}
                                renderActions={renderActions}
                            />
                            <Pagination
                                currentCount={jobTitles.length}
                                totalCount={jobTitles.length}
                                itemType="postes"
                            />
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}

export default JobTitle;