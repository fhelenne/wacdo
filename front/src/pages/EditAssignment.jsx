import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {EntityPicker} from "../components/forms/EntityPicker.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useParams, useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function EditAssignment() {

    // Utilitaire de formatage pour extraire uniquement "YYYY-MM-DD" d'une date ISO
    const formatDateToInput = (isoDate) => {
        if (!isoDate) return ''; // Gérer les cas sans valeur
        return new Date(isoDate).toISOString().split('T')[0]; // Extraire uniquement la partie "YYYY-MM-DD"
    };

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
                setUser(response.employee['@id']);
                setRestaurant(response.restaurant['@id']);
                setJobTitle(response.jobTitle['@id']);
                setStartAt(formatDateToInput(response.startAt));
                setEndAt(formatDateToInput(response.endAt));
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
            .then(response => {
                if (response.ok) {
                    notify.success('Affectation modifiée', {});
                    navigate('/assignments');
                } else {
                    notify.error('Erreur lors de la modification de l\'affectation', {});
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
                    title={"Modifier l'affectation #" + params.id}
                    description=""
                />
                <form role="form" onSubmit={handleOnSubmit}>
                    <div role="group" aria-labelledby="user-label">
                        <EntityPicker
                            entityType="users"
                            label="Collaborateur"
                            initialValue={user}
                            onEntitySelect={(selectedUserId) => setUser(selectedUserId)}
                        />
                    </div>
                    <div role="group" aria-labelledby="restaurant-label">
                        <EntityPicker
                            entityType="restaurants"
                            label="Restaurant"
                            initialValue={restaurant}
                            onEntitySelect={(selectedRestaurantId) => setRestaurant(selectedRestaurantId)}
                        />
                    </div>
                    <div role="group" aria-labelledby="job-title-label">
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