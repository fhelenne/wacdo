import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import ActivityItem from '../components/ActivityItem';
import Button from '../components/Button';
import { faChartBar } from '../utils/icons.js';

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
          <div role="activity-list">
            <ActivityItem 
              title="Nouvel utilisateur ajouté"
              description="Marie Dupont a rejoint l'équipe"
              timestamp="Il y a 2 heures"
            />
            <ActivityItem 
              title="Restaurant mis à jour"
              description='"Wacdo Centre" - Informations modifiées'
              timestamp="Il y a 4 heures"
            />
            <ActivityItem 
              title="Nouvelle affectation"
              description="Jean Martin assigné au poste de Manager"
              timestamp="Il y a 6 heures"
            />
          </div>
          <Button icon={faChartBar} color="primary">
            Voir toutes les activités →
          </Button>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;