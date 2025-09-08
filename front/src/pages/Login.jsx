import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
    document.title = `Wacdo : Login`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(import.meta.env.VITE_WACDO_BACK_URL + '/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }
      const data = await response.json();
      const userInfo = jwtDecode(data.token)

      if (data.token) {
        login(data.token);
        const isAdmin = !!userInfo.roles?.includes("ROLE_ADMIN");
        const isEmployee = !!userInfo.roles?.includes("ROLE_EMPLOYEE") && !isAdmin;
        navigate(isAdmin ? '/assignments' : isEmployee ? '/users/details/'+userInfo.userId : '/assignments');
      } else {
        throw new Error('Réponse inattendue du serveur');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main role="login">
      <section>
        <PageHeader 
          title="Se connecter"
          description="Accédez à votre espace Wacdo"
          titleLevel="h2"
        />
        {error && (
          <div role="alert" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
        )}
        <form role="form" onSubmit={handleSubmit}>
          <FormField
            id="email"
            name="email"
            type="email"
            label="Adresse email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <Button type="submit">
            Se connecter
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Login;