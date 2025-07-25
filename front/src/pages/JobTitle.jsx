import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

function JobTitle() {
  const [jobTitles] = useState([
    { 
      id: 1, 
      name: 'Manager',
      assignments: []
    },
    { 
      id: 2, 
      name: 'Superviseur',
      assignments: []
    },
    { 
      id: 3, 
      name: 'Cuisinier',
      assignments: []
    },
    { 
      id: 4, 
      name: 'Serveur',
      assignments: []
    },
    { 
      id: 5, 
      name: 'Caissier',
      assignments: []
    },
  ]);


  const columns = [
    { header: 'Poste', key: 'name' }
  ];

  const renderActions = () => (
    <>
      <Button>Modifier</Button>
      <Button>Supprimer</Button>
    </>
  );

  return (
    <main role="jobtitle">
      <section>
        <PageHeader 
          title="Gestion des Postes"
          actionButton={<Button>Créer un poste</Button>}
        />

        <section>
          <StatCard 
            title="Total postes" 
            value={jobTitles.length} 
          />
        </section>

        <section>
          <SearchBar 
            placeholder="Rechercher un poste..."
          />

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
        </section>
      </section>
    </main>
  );
}

export default JobTitle;