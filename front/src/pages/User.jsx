import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce collaborateur ?")) {
      fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/users/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // Update state after deletion
      })
      .catch((error) => console.log(error));
    }
  };

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
      header: 'Collaborateur', 
      render: (user) => (
        <div>
          <div>{user.firstName} {user.lastName}</div>
          <div>{user.email}</div>
        </div>
      )
    }
  ];

  const renderActions = (user) => (
    <>
      <Button icon={faEdit} color="warning" to={"/users/edit/"+user.id}>Modifier</Button>
      <Button icon={faTrash} color="danger" onClick={() => handleDelete(user.id)}>Supprimer</Button>
    </>
  );

  return (
    <main role="users">

      <section>
        <PageHeader 
          title="Gestion des collaborateurs"
          actionButton={<Button icon={faPlus} color="success" to={'/users/add/'}>Ajouter un collaborateur</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher un collaborateur..." />
          {loading ? (
            <Loading message="Chargement des collaborateurs..." />
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
                itemType="collaborateurs"
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default User;