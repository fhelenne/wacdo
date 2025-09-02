import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function EditJobTitle() {
    const [title,setTitle] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/'+params.id,{
          method: "GET"
        }).then((response) => response.json())
          .then(response => {
            setTitle(response.name);
        });
    }, [params]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/'+params.id,{
          method: "PATCH",
          body: JSON.stringify({ name: title }),
          // …
        })
        .then(response => {
            if (response.ok) {
                notify.success('poste enregistré', {});
                navigate('/job-titles');
            } else {
                notify.error('Erreur lors de la modification du poste', {});
            }
        })
        .catch(error => {
            // notify.error('Erreur de connexion'+error, {});
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title={"Modifier le poste "+title}
          description=""
        />
          <form role="form" onSubmit={handleOnSubmit}>
              <FormField name='name' label="Nom du poste" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
