import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import EntityPicker from "../components/forms/EntityPicker.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";

export default function CreateAssignment() {
    const [user, setUser] = useState('');
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
        });
        navigate('/assignments');
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
