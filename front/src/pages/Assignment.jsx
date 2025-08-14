import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';
import fetchWithJWT from '../utils/FetcWithJWT.js'

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

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

    // 2. Fetch assignments on mount
    useEffect(() => {
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
                console.log(error);
                setLoading(false);
            });
    }, []);

  const columns = [
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
  ];

  const renderActions = () => (
    <>
      <Button icon={faEdit} color="warning">Modifier</Button>
      <Button icon={faTrash} color="danger">Supprimer</Button>
    </>
  );

  return (
    <main role="assignments">
      <section>
        <PageHeader 
          title="Gestion des Affectations"
          actionButton={<Button icon={faPlus} color="success">Ajouter une affectation</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher une affectation..." />
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