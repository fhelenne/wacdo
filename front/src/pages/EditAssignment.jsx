import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import EntityPicker from "../components/forms/EntityPicker.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useParams, useNavigate} from "react-router-dom";

export default function EditAssignment() {
    const [user, setUser] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    // Fetch assignment details on mount
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + `/assignments/${params.id}`, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((response) => {
            // Assuming the response contains the full assignment details
            setUser(response.user);
            setRestaurant(response.restaurant);
            setJobTitle(response.jobTitle);
            setStartAt(response.startAt);
            setEndAt(response.endAt);
        })
        .catch((error) => {
            console.error('Failed to fetch assignment details:', error);
            // Optionally, show an error message or redirect
            navigate('/assignments');
        });
    }, [params.id, navigate]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + `/assignments/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                user: user,
                restaurant: restaurant,
                jobTitle: jobTitle,
                startAt: startAt,
                endAt: endAt
            }),
            // Optional: Add headers if needed
            headers: {
                'Content-Type': 'application/merge-patch+json'
            }
        })
        .then(() => {
            navigate('/assignments');
        })
        .catch((error) => {
            console.error('Failed to update assignment:', error);
            // Optionally, show an error message to the user
            window.alert("Impossible de mettre à jour l'affectation. Veuillez réessayer.");
        });
    }

    return (
        <main role="dashboard">
            <section>
                <PageHeader
                    title="Modifier une affectation"
                    description=""
                />
                <form role="form" onSubmit={handleOnSubmit}>
                    <div role="group" aria-labelledby="user-label">
                        <label id="user-label">Collaborateur</label>
                        <EntityPicker 
                            entityType="users"
                            label="Collaborateur"
                            initialValue={user}
                            onEntitySelect={(selectedUserId) => setUser(selectedUserId)}
                        />
                    </div>
                    <div role="group" aria-labelledby="restaurant-label">
                        <label id="restaurant-label">Restaurant</label>
                        <EntityPicker 
                            entityType="restaurants"
                            label="Restaurant"
                            initialValue={restaurant}
                            onEntitySelect={(selectedRestaurantId) => setRestaurant(selectedRestaurantId)}
                        />
                    </div>
                    <div role="group" aria-labelledby="job-title-label">
                        <label id="job-title-label">Poste</label>
                        <EntityPicker 
                            entityType="jobTitles"
                            label="Poste"
                            initialValue={jobTitle}
                            onEntitySelect={(selectedJobTitleId) => setJobTitle(selectedJobTitleId)}
                        />
                    </div>
                    <FormField 
                        name='startAt' 
                        type="date" 
                        label="Date de début" 
                        value={startAt}
                        onChange={(e) => setStartAt(e.target.value)}
                    />
                    <FormField 
                        name='endAt' 
                        type="date" 
                        label="Date de fin" 
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                    />
                    <Button type='submit'>Enregistrer</Button>
                </form>
            </section>
        </main>
    );
} 