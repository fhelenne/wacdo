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

    // 2. Fetch assignments on mount
    useEffect(() => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/assignments`)
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
    { header: 'Collaborateur', key: 'user' },
    { header: 'Poste', key: 'jobTitle' },
    { header: 'Restaurant', key: 'restaurant' },
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