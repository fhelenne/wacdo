import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import {EntityPicker} from "../components/forms/EntityPicker.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
import {useForm} from "react-hook-form";

export default function CreateAssignment() {
    const params = new URLSearchParams(window.location.search);
    const [user, setUser] = useState(params.has('user_id') ? params.get('user_id') : '');
    const [restaurant, setRestaurant] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const navigate = useNavigate();

    document.title = `Wacdo : Créer une affectation`;
    const {
            register,
            handleSubmit,
            formState: {errors},
            setValue,
        } = useForm({mode: 'all'})
    const onSubmit = () => {
        console.log('Form Submission:', {
            user,
            restaurant,
            jobTitle,
            startAt,
            endAt
        });

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
                notify.success('Affectation créée', {autoClose: false});
                const userregex = /\/api\/users\/(\d+)/;
                if (params.has('user_id')) {
                    const match = params.get('user_id').match(userregex);
                    const userId = match ? match[1] : null;
                    navigate(userId ? '/users/detail/' + userId : '/assignments');
                } else {
                    navigate('/assignments');
                }
            } else {
                notify.error('Erreur lors de la création de l\'affectation', {autoClose: false});
            }
        })
    }

    return (
        <main role="dashboard">
            <section>
                <PageHeader
                    title="Créer une affectation"
                    description=""
                />
                <form role="form" onSubmit={handleSubmit(onSubmit)}>

                    <EntityPicker
                        entityType="users"
                        label="Collaborateur"
                        initialValue={params.get('user_id')}
                        disabled={params.has('user_id')}
                        onEntitySelect={(selectedUserId) => setUser(selectedUserId)}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <EntityPicker
                        entityType="restaurants"
                        label="Restaurant"
                        onEntitySelect={(selectedRestaurantId) => setRestaurant(selectedRestaurantId)}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <EntityPicker
                        entityType="jobTitles"
                        label="Poste"
                        onEntitySelect={(selectedJobTitleId) => setJobTitle(selectedJobTitleId)}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    <div>
                        <label htmlFor="assignment-startAt">Date de début</label>
                        <input
                            id='assignment-startAt'
                            name='startAt'
                            type="date"
                            {...register('startAt', {required: "la date de début est obligatoire"})}
                            data-form-type="other"
                            onChange={(e) => setStartAt(e.target.value)}
                        />
                        {errors.startAt && <span className="message error">{errors.startAt?.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="assignment-endAt">Date de fin</label>
                        <input
                            id='assignment-endAt'
                            name='endAt'
                            type="date"
                            {...register('endAt', {required: "la date de fin est obligatoire"})}
                            data-form-type="other"
                            onChange={(e) => setEndAt(e.target.value)}
                        />
                        {errors.endAt && <span className="message error">{errors.endAt?.message}</span>}
                    </div>
                    <Button type='submit'>Enregistrer</Button>
                </form>
            </section>
        </main>
    );
}
