import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import {faEdit} from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'
import {useParams} from "react-router-dom";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {notify} from "../utils/notify.js";
import SearchBar from "../components/SearchBar.jsx";
import DataTable from "../components/DataTable.jsx";
import Pagination from "../components/Pagination.jsx";

function DetailUser() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    document.title = `Wacdo : Détails d'un collaborateur`;
    const isObject = (value) => value !== null && typeof value === 'object';

    const getJobTitleName = (row) => {
        if (!row || !row.jobTitle || !isObject(row.jobTitle)) return '';
        return row.jobTitle.name || '';
    };
    const getRestaurantName = (row) => {
        if (!row || !row.restaurant || !isObject(row.restaurant)) return '';
        return row.restaurant.name || '';
    };
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
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
        notify.success('supprimé !', {})
        setUser(prevUser => ({
          ...prevUser,
          assignments: prevUser.assignments.filter(assignment => assignment.id !== id)
        }));
      })
      .catch((error) => {
        notify.error(error, {});
      });
    }
  };


    useEffect(() => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/' + params.id)
            .then((response) => response.json())
            .then((response) => {
                setUser(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            header: 'Id',
            render: (user) => user.id
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
        <main role="jobtitle">
            <section>
                <PageHeader
                    title={"Detail du collaborateur " + params.id}
                    actionButton={<Button icon={faEdit} color="warning"
                                          to={'/users/edit/' + params.id}>Modifier</Button>}
                />

                <section>
                    {loading ? (
                        <Loading message="Chargement des postes..."/>
                    ) : (
                        <>
                            <dl>
                                <dt>ID</dt>
                                <dd>{user.id}</dd>
                                <dt>Nom</dt>
                                <dd>{user.lastName}</dd>
                                <dt>Prénom</dt>
                                <dd>{user.firstName}</dd>
                                <dt>email</dt>
                                <dd>{user.email}</dd>
                                <dt>Date de première embauche</dt>
                                <dd>{formatDate(user.firstHiredAt)}</dd>
                            </dl>
                        </>
                    )}
                </section>
            </section>
            <section>
        <PageHeader
          title="Affectations"
          actionButton={<Button icon={faPlus} color="success" to={'/assignments/add/?'+new URLSearchParams({'user_id':user['@id']})}>Ajouter une affectation</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher une affectation..." />
          {loading ? (
            <Loading message="Chargement des affectations..." />
          ) : (
            <>
              <DataTable
                columns={columns}
                data={user.assignments}
                renderActions={renderActions}
              />
              <Pagination
                currentCount={user.assignments.length}
                totalCount={user.assignments.length}
                itemType="affectations"
              />
            </>
          )}
        </section>
      </section>
        </main>
    );
}

export default DetailUser;