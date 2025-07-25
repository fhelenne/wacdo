import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import FormField from '../components/FormField';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login attempt:', { email, password });
  };

  return (
    <main role="login">
      <section>
        <PageHeader 
          title="Se connecter"
          description="Accédez à votre espace Wacdo"
          titleLevel="h2"
        />
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

          <div>
            <div>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label htmlFor="remember-me">Se souvenir de moi</label>
            </div>
            <div>
              <a href="#">Mot de passe oublié ?</a>
            </div>
          </div>

          <Button type="submit">
            Se connecter
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Login;