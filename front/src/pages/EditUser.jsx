import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import EntityPicker from "../components/forms/EntityPicker.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function EditUser() {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [firstHiredAt,setFirstHiredAt] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/'+params.id,{
          method: "GET"
        }).then((response) => response.json())
          .then(response => {
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setFirstHiredAt(response.firstHiredAt);
            setJobTitle(response.jobTitle);
        });
    }, [params]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/'+params.id,{
          method: "PATCH",
          body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              firstHiredAt: firstHiredAt,
              jobTitle: jobTitle
          }),
        }).then(response => {
            if (response.ok) {
                notify.success('Collaborateur modifié', {});
                navigate('/users');
            } else {
                notify.error('Erreur lors de la modification du collaborateur', {});
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
              <FormField name='firstName' label="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <FormField name='lastName' label="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              <FormField name='firstHiredAt' type="date" label="Date de première embauche" value={firstHiredAt} onChange={(e) => setFirstHiredAt(e.target.value)}/>
              <EntityPicker 
                entityType="jobTitles"
                label="Poste"
                initialValue={jobTitle}
                onEntitySelect={(selectedJobTitleId) => setJobTitle(selectedJobTitleId)}
              />
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
