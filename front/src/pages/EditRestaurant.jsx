import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function EditRestaurant() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        console.log('init');
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants/' + params.id, {
            method: "GET"
        }).then((response) => response.json())
            .then(response => {
                setName(response.name);
                setAddress(response.address);
                setZipCode(response.zipCode);
                setCity(response.city);
            });
    }, [params]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants/' + params.id, {
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                address: address,
                zipCode: zipCode,
                city: city,
            }),
            // …
        });
        navigate('/restaurants');
    }

    return (<main role="dashboard">
        <section>
            <PageHeader
                title="Modifier le poste {title}"
                description=""
            />
            <form role="form" onSubmit={handleOnSubmit}>
                <FormField name='name' label="Nom" value={name} placeholder="Nom"
                           onChange={(e) => setName(e.target.value)}/>
                <FormField name='address' label="Adresse" value={address} placeholder="Adresse"
                           onChange={(e) => setAddress(e.target.value)}/>
                <FormField name='zipCode' label="Code postal" value={zipCode} placeholder="Code postal"
                           onChange={(e) => setZipCode(e.target.value)}/>
                <FormField name='city' label="VIlle" value={city} placeholder="ville"
                           onChange={(e) => setCity(e.target.value)}/>

                <Button type='submit'>Enregistrer</Button>
            </form>
        </section>
    </main>);
}
