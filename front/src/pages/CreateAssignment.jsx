import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {EntityPicker} from "../components/forms/EntityPicker.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function CreateAssignment() {
    const params = new URLSearchParams(window.location.search);
    const [user, setUser] = useState(params.has('user_id')?params.get('user_id'):'');
    const [restaurant, setRestaurant] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/assignments', {
            method: "POST",
            body: JSON.stringify({
                user: user,
                restaurant: restaurant,
                jobTitle: jobTitle,
                startAt: startAt,
                endAt: endAt
            }),
            // …
        }).then(response => {
            if (response.ok) {
                notify.success('Affectation créée', {});
                const userregex = /\/api\/users\/(\d+)/;
                if (params.has('user_id')) {
                    const match = params.get('user_id').match(userregex);
                    const userId = match ? match[1] : null;
                    navigate(userId ? '/users/detail/' + userId : '/assignments');
                } else {
                    navigate('/assignments');
                }
            } else {
                notify.error('Erreur lors de la création de l\'affectation', {});
            }
        })
            .catch(error => {
                notify.error('Erreur de connexion' + error, {});
            });
    }

    return (
        <main role="dashboard">
            <section>
                <PageHeader
                    title="Créer une affectation"
                    description=""
                />
                <form role="form" onSubmit={handleOnSubmit}>

                    <EntityPicker
                        entityType="users"
                        label="Collaborateur"
                        initialValue={params.get('user_id')}
                        disabled={params.has('user_id')}
                        onEntitySelect={(selectedUserId) => setUser(selectedUserId)}
                    />
                    <EntityPicker
                        entityType="restaurants"
                        label="Restaurant"
                        onEntitySelect={(selectedRestaurantId) => setRestaurant(selectedRestaurantId)}
                    />
                    <EntityPicker
                        entityType="jobTitles"
                        label="Poste"
                        onEntitySelect={(selectedJobTitleId) => setJobTitle(selectedJobTitleId)}
                    />
                    <FormField
                        name='startAt'
                        type="date"
                        label="Date de début"
                        onChange={(e) => setStartAt(e.target.value)}
                    />
                    <FormField
                        name='endAt'
                        type="date"
                        label="Date de fin"
                        onChange={(e) => setEndAt(e.target.value)}
                    />
                    <Button type='submit'>Enregistrer</Button>
                </form>
            </section>
        </main>
    );
}
