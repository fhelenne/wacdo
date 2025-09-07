import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
import {useForm} from "react-hook-form";

export default function EditRestaurant() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    document.title = `Wacdo : Modifier un restaurant`;
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm()
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants/' + params.id, {
            method: "GET"
        }).then((response) => response.json())
            .then(response => {
                setName(response.name);
                setValue('name',response.name);
                setAddress(response.address);
                setValue('address',response.address);
                setZipCode(response.zipCode);
                setValue('zipCode',response.zipCode);
                setCity(response.city);
                setValue('city',response.city);
            });
    }, [params]);

    const onSubmit = () => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants/' + params.id, {
            method: "PATCH",
            body: JSON.stringify({
                name: name,
                address: address,
                zipCode: zipCode,
                city: city,
            }),
            // …
        }).then(response => {
            if (response.ok) {
                notify.success('Restaurant modifié', {});
                navigate('/restaurants');
            } else {
                notify.error('Erreur lors de la modification du restaurant', {});
            }
        })
        .catch(error => {
            // notify.error('Erreur de connexion'+error, {});
        });
    }

    return (<main role="dashboard">
        <section>
            <PageHeader
                title={"Modifier le restaurant "+name}
                description=""
            />
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="restaurant-name">Nom</label>
                    <input
                        id='restaurant-name'
                        name='name'
                        value={name}
                        {...register('name', {required: 'Le nom est obligatoire.'})}
                        data-form-type="other"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="message error">{errors.name?.message}</span>}
                </div>
                <div>
                    <label htmlFor="restaurant-address">Adresse</label>
                    <input
                        id='restaurant-address'
                        name='address'
                        value={address}
                        {...register('address', {required: "l'adresse est obligatoire"})}
                        data-form-type="other"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <span className="message error">{errors.address?.message}</span>}
                </div>
                <div>
                    <label htmlFor="restaurant-zipCode">Code postal</label>
                    <input
                        id='restaurant-zipCode'
                        name='zipCode'
                        value={zipCode}
                        {...register('zipCode', {
                            required: 'Le code postal est obligatoire.',
                            pattern: {
                                value: /^[0-9]{5,5}$/,
                                message: "Le code postal n'est pas valide",
                            }
                        })}
                        data-form-type="other"
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    {errors.zipCode && <span className="message error">{errors.zipCode?.message}</span>}
                </div>
                <div>
                    <label htmlFor="restaurant-city">Ville</label>
                    <input
                        id='restaurant-city'
                        name='city'
                        value={city}
                        {...register('city', {required: 'La ville est obligatoire.'})}
                        data-form-type="other"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <span className="message error">{errors.city?.message}</span>}
                </div>
                <Button type='submit'>Enregistrer</Button>
            </form>
        </section>
    </main>);
}
