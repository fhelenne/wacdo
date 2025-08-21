import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";

export default function EditJobTitle() {
    const [title,setTitle] = useState('');
    const id = useParams();
     useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/'+id,{
          method: "GET"
          // …
        }).then(response => {
            setTitle(response.data.name);
        });
    }, [id]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles',{
          method: "PATCH",
          body: JSON.stringify({ id: id, name: title }),
          // …
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title="Modifier le poste {title}"
          description=""
        />
          <form onSubmit={handleOnSubmit}>
              <FormField name='name' label="Nom du poste" value="toto" onChange={(e) => setTitle(e.target.value)}/>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
