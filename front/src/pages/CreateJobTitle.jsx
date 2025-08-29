import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function CreateJobTitle() {
    const [title,setTitle] = useState('');
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles',{
          method: "POST",
          body: JSON.stringify({ name: title }),
          // …
        })
        .then(response => {
            if (response.ok) {
                notify.success('poste enregistré', {});
                navigate('/job-titles');
            } else {
                notify.error('Erreur lors de la création du poste', {});
            }
        })
        .catch(error => {
            notify.error('Erreur de connexion'+error, {});
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title="Créer un poste"
          description=""
        />
          <form role="form" onSubmit={handleOnSubmit}>
              <FormField name='name' label="Nom du poste" placeholder="Nom du poste" onChange={(e) => setTitle(e.target.value)}/>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
