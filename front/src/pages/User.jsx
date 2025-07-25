import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

function User() {
  const [users] = useState([
    { 
      id: 1, 
      firstName: 'Marie', 
      lastName: 'Dupont', 
      email: 'marie.dupont@wacdo.com', 
      roles: ['ROLE_MANAGER'],
      firstHiredAt: '2023-01-15T00:00:00+00:00',
      assignments: []
    },
    { 
      id: 2, 
      firstName: 'Jean', 
      lastName: 'Martin', 
      email: 'jean.martin@wacdo.com', 
      roles: ['ROLE_USER'],
      firstHiredAt: '2023-02-01T00:00:00+00:00',
      assignments: []
    },
    { 
      id: 3, 
      firstName: 'Sophie', 
      lastName: 'Bernard', 
      email: 'sophie.bernard@wacdo.com', 
      roles: ['ROLE_SUPERVISOR'],
      firstHiredAt: '2023-01-10T00:00:00+00:00',
      assignments: []
    },
    { 
      id: 4, 
      firstName: 'Pierre', 
      lastName: 'Durand', 
      email: 'pierre.durand@wacdo.com', 
      roles: ['ROLE_USER'],
      firstHiredAt: '2023-03-01T00:00:00+00:00',
      assignments: []
    },
  ]);

  const columns = [
    { 
      header: 'Nom', 
      render: (user) => `${user.firstName} ${user.lastName}`
    },
    { header: 'Email', key: 'email' },
    { 
      header: 'Rôles', 
      render: (user) => user.roles.join(', ')
    }
  ];

  const renderActions = () => (
    <>
      <Button role="action-button">Modifier</Button>
      <Button role="action-button">Supprimer</Button>
    </>
  );

  return (
    <main role="user">
      <section>
        <PageHeader 
          title="Gestion des Utilisateurs"
          actionButton={<Button>Ajouter un utilisateur</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher un utilisateur..." />

          <DataTable 
            columns={columns}
            data={users}
            renderActions={renderActions}
          />

          <Pagination 
            currentCount={users.length}
            totalCount={users.length}
            itemType="utilisateurs"
          />
        </section>
      </section>
    </main>
  );
}

export default User;