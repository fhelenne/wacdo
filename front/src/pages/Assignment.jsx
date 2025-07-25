import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

function Assignment() {
  const [assignments] = useState([
    { 
      id: 1, 
      employee: {
        id: 1,
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@wacdo.com',
        roles: ['ROLE_MANAGER']
      },
      restaurant: {
        id: 1,
        name: 'Wacdo Centre',
        address: '123 Rue de la Paix',
        zipCode: '75001',
        city: 'Paris'
      },
      jobTitle: {
        id: 1,
        name: 'Manager'
      },
      startAt: '2024-01-15T00:00:00+00:00',
      endAt: '2024-12-31T00:00:00+00:00'
    },
    { 
      id: 2, 
      employee: {
        id: 2,
        firstName: 'Jean',
        lastName: 'Martin',
        email: 'jean.martin@wacdo.com',
        roles: ['ROLE_USER']
      },
      restaurant: {
        id: 2,
        name: 'Wacdo Nord',
        address: '456 Avenue du Nord',
        zipCode: '59000',
        city: 'Lille'
      },
      jobTitle: {
        id: 3,
        name: 'Cuisinier'
      },
      startAt: '2024-02-01T00:00:00+00:00',
      endAt: '2024-11-30T00:00:00+00:00'
    },
    { 
      id: 3, 
      employee: {
        id: 3,
        firstName: 'Sophie',
        lastName: 'Bernard',
        email: 'sophie.bernard@wacdo.com',
        roles: ['ROLE_SUPERVISOR']
      },
      restaurant: {
        id: 3,
        name: 'Wacdo Sud',
        address: '789 Boulevard du Midi',
        zipCode: '13000',
        city: 'Marseille'
      },
      jobTitle: {
        id: 2,
        name: 'Superviseur'
      },
      startAt: '2024-01-10T00:00:00+00:00',
      endAt: '2024-06-30T00:00:00+00:00'
    },
    { 
      id: 4, 
      employee: {
        id: 4,
        firstName: 'Pierre',
        lastName: 'Durand',
        email: 'pierre.durand@wacdo.com',
        roles: ['ROLE_USER']
      },
      restaurant: {
        id: 1,
        name: 'Wacdo Centre',
        address: '123 Rue de la Paix',
        zipCode: '75001',
        city: 'Paris'
      },
      jobTitle: {
        id: 4,
        name: 'Serveur'
      },
      startAt: '2024-03-01T00:00:00+00:00',
      endAt: '2024-12-31T00:00:00+00:00'
    },
  ]);


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
      <Button>Modifier</Button>
      <Button>Supprimer</Button>
    </>
  );

  const filters = [
    {
      defaultOption: "Tous les restaurants",
      options: [
        { value: "centre", label: "Wacdo Centre" },
        { value: "nord", label: "Wacdo Nord" },
        { value: "sud", label: "Wacdo Sud" }
      ]
    }
  ];

  return (
    <main role="assignment">
      <section>
        <PageHeader 
          title="Gestion des Affectations"
          actionButton={<Button>Nouvelle affectation</Button>}
        />

        <section>
          <SearchBar 
            placeholder="Rechercher par utilisateur..."
            filters={filters}
          />

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
        </section>
      </section>
    </main>
  );
}

export default Assignment;