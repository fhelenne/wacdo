import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';
import fetchWithJWT from '../utils/PrivateRoute'

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/users`)
      .then((response) => response.json())
      .then((response) => {
        setUsers(response.member);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
      <Button icon={faEdit} color="warning">Modifier</Button>
      <Button icon={faTrash} color="danger">Supprimer</Button>
    </>
  );

  return (
    <main role="user">
      <section>
        <PageHeader 
          title="Gestion des Utilisateurs"
          actionButton={<Button icon={faPlus} color="success">Ajouter un utilisateur</Button>}
        />
        <section>
          <SearchBar placeholder="Rechercher un utilisateur..." />
          {loading ? (
            <Loading message="Chargement des utilisateurs..." />
          ) : (
            <>
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
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default User;