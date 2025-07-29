import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { faPlus, faEdit, faTrash } from '../utils/icons.js';

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_WACDO_BACK_URL + `/restaurants`)
      .then((response) => response.json())
      .then((response) => {
        setRestaurants(response.member);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { 
      header: 'Restaurant', 
      render: (restaurant) => (
        <div>
          <div>{restaurant.name}</div>
          <div>{restaurant.address}, {restaurant.zipCode} {restaurant.city}</div>
        </div>
      )
    }
  ];

  const renderActions = () => (
    <>
      <Button icon={faEdit} color="warning">Modifier</Button>
      <Button icon={faTrash} color="danger">Supprimer</Button>
    </>
  );

  return (
    <main role="restaurant">

      <section>
        <PageHeader 
          title="Gestion des Restaurants"
          actionButton={<Button icon={faPlus} color="success">Ajouter un restaurant</Button>}
        />

        <section>
          <SearchBar placeholder="Rechercher un restaurant..." />
          {loading ? (
            <Loading message="Chargement des restaurants..." />
          ) : (
            <>
              <DataTable 
                columns={columns}
                data={restaurants}
                renderActions={renderActions}
              />
              <Pagination 
                currentCount={restaurants.length}
                totalCount={restaurants.length}
                itemType="restaurants"
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default Restaurant;