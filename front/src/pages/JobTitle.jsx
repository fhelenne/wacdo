import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';
import fetchWithJWT from '../utils/FetcWithJWT.js'

function JobTitle() {
  const [jobTitles, setJobTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const columns = [
    { header: 'Poste', key: 'name' }
  ];

  const renderActions = () => (
    <>
      <Button icon={faEdit} color="warning">Modifier</Button>
      <Button icon={faTrash} color="danger">Supprimer</Button>
    </>
  );

  return (
    <main role="jobtitle">
      <section>
        <PageHeader 
          title="Gestion des Postes"
          actionButton={<Button icon={faPlus} color="success">Ajouter un poste</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher un poste..." />
          {loading ? (
            <Loading message="Chargement des postes..." />
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