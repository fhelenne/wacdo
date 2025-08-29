import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
export default function CreateRestaurant() {
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [zipCode,setZipCode] = useState('');
    const [city,setCity] = useState('');
    const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants',{
          method: "POST",
          body: JSON.stringify({ name: name, address: address, zipCode: zipCode, city: city }),
          // …
        }).then(response => {
            if (response.ok) {
                notify.success('Restaurant créé', {});
                navigate('/restaurants');
            } else {
                notify.error('Erreur lors de la création du restaurant', {});
            }
        })
        .catch(error => {
            notify.error('Erreur de connexion'+error, {});
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title="Créer un restaurant"
          description=""
        />
          <form role="form" onSubmit={handleOnSubmit}>
              <FormField name='name' label="Nom" placeholder="Nom" onChange={(e) => setName(e.target.value)}/>
               <FormField name='address' label="Adresse" placeholder="Adresse" onChange={(e) => setAddress(e.target.value)}/>
               <FormField name='zipCode' label="Code postal" placeholder="Code postal" onChange={(e) => setZipCode(e.target.value)}/>
               <FormField name='city' label="VIlle" placeholder="ville" onChange={(e) => setCity(e.target.value)}/>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
