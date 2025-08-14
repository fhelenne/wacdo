import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';

function Dashboard() {
  return (
    <main role="dashboard">
      <section>
        <PageHeader 
          title="Tableau de bord Wacdo" 
          description="Gérez votre réseau de restaurants en toute simplicité" 
        />
        
        <section role="stats" aria-label="Statistiques">
          <StatCard title="Utilisateurs" value="125" subtitle="+12% ce mois" />
          <StatCard title="Restaurants" value="8" subtitle="+2 nouveaux" />
          <StatCard title="Affectations" value="42" subtitle="5 en attente" />
          <StatCard title="Postes" value="15" subtitle="3 actifs" />
        </section>

        <section role="activities" aria-label="Activités récentes">
          <header>
            <h3>Activités récentes</h3>
            <span>Aujourd'hui</span>
          </header>
        
        </section>
      </section>
    </main>
  );
}

export default Dashboard;