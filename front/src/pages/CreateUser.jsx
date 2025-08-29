import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function CreateUser() {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [firstHiredAt,setFirstHiredAt] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/'+params.id,{
          method: "POST",
          body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              firstHiredAt: firstHiredAt
          }),
          // …
        }).then(response => {
            if (response.ok) {
                notify.success('Collaborateur créé', {});
                navigate('/users');
            } else {
                notify.error('Erreur lors de la création du collaborateur', {});
            }
        })
        .catch(error => {
            notify.error('Erreur de connexion'+error, {});
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title="Modifier le collaborateur {firstName} {lastName}"
          description=""
        />
          <form role="form" onSubmit={handleOnSubmit}>
              <FormField name='firstName' label="Prénom" onChange={(e) => setFirstName(e.target.value)}/>
              <FormField name='lastName' label="Nom"  onChange={(e) => setLastName(e.target.value)}/>
              <FormField name='firstHiredAt' type="date" label="Date de première embauche" onChange={(e) => setFirstHiredAt(e.target.value)}/>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
