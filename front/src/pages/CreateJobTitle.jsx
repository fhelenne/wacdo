import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useState, useRef} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js'
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
import {useForm} from "react-hook-form"


export default function CreateJobTitle() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    document.title = `Wacdo : Créer un Poste`;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: 'all'})
    const onSubmit = () => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles', {
            method: "POST",
            body: JSON.stringify({name: title}),
        })
            .then(() => {
                // fetchWithJWT gère déjà les erreurs automatiquement
                notify.success('Poste créé avec succès', {});
                navigate('/job-titles');
            })
    }

    return (<main role="dashboard">
        <section>
            <PageHeader
                title="Créer un poste"
                description=""
            />
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="job_title-name">Nom du poste</label>
                    <input
                        id='job_title-name'
                        name='name'
                        {...register('name', {required: 'Le nom du poste est obligatoire.'})}
                        data-form-type="other"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.name && <span className="message error">{errors.name?.message}</span>}
                </div>
                <Button type='submit'>Enregistrer</Button>
            </form>
        </section>
    </main>);
}
