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
import {notify} from "../utils/notify.js";

function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/restaurants`)
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

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce restaurant ?")) {
      fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + `/restaurants/${id}`, {
        method: "DELETE",
      })
      .then(() => {
          notify.success('supprimé !', {})
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== id)); // Update state after deletion
      })
      .catch((error) => notify.error(error, {}));
    }
  };

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

  const renderActions = (restaurant) => (
    <>
      <Button icon={faEdit} color="warning" to={"/restaurants/edit/"+restaurant.id}>Modifier</Button>
      <Button icon={faTrash} color="danger" onClick={() => handleDelete(restaurant.id)}>Supprimer</Button>
    </>
  );

  return (
    <main role="restaurant">

      <section>
        <PageHeader 
          title="Gestion des Restaurants"
          actionButton={<Button icon={faPlus} color="success" to={'/restaurants/add/'}>Ajouter un restaurant</Button>}
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