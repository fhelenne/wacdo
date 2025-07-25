import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';

function Restaurant() {
  const [restaurants] = useState([
    { 
      id: 1, 
      name: 'Wacdo Centre', 
      address: '123 Rue de la Paix',
      zipCode: '75001',
      city: 'Paris',
      assignments: []
    },
    { 
      id: 2, 
      name: 'Wacdo Nord', 
      address: '456 Avenue du Nord',
      zipCode: '59000',
      city: 'Lille',
      assignments: []
    },
    { 
      id: 3, 
      name: 'Wacdo Sud', 
      address: '789 Boulevard du Midi',
      zipCode: '13000',
      city: 'Marseille',
      assignments: []
    },
    { 
      id: 4, 
      name: 'Wacdo Est', 
      address: '321 Rue de l\'Est',
      zipCode: '67000',
      city: 'Strasbourg',
      assignments: []
    },
  ]);

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
      <Button>Modifier</Button>
      <Button>Supprimer</Button>
    </>
  );

  return (
    <main role="restaurant">
      <section>
        <PageHeader 
          title="Gestion des Restaurants"
          actionButton={<Button>Ajouter un restaurant</Button>}
        />

        <section>
          <StatCard 
            title="Total restaurants" 
            value={restaurants.length} 
          />
        </section>

        <section>
          <SearchBar placeholder="Rechercher un restaurant..." />

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
        </section>
      </section>
    </main>
  );
}

export default Restaurant;