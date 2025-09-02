import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [plainPassword, setPlainPassword] = useState('');
    const [firstHiredAt, setFirstHiredAt] = useState('');
    const [role, setRole] = useState('employee');
    const navigate = useNavigate();

    const getRoles = (selectedRole) => {
        return selectedRole === 'admin' ? ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] : ['ROLE_EMPLOYEE'];
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users', {
            method: "POST",
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                plainPassword: plainPassword,
                firstHiredAt: firstHiredAt,
                roles: getRoles(role)
            }),
            // …
        }).then(response => {
            if (response.ok) {
                notify.success('Collaborateur créé', {});
                navigate('/users');
            } else {
                notify.error('Erreur lors de la création du collaborateur', {});
            }
        })
            .catch(error => {
                // notify.error('Erreur de connexion' + error, {});
            });
    }

    return (<main role="dashboard">
        <section>
            <PageHeader
                title="Créer un collaborateur"
                description=""
            />
            <form role="form" onSubmit={handleOnSubmit}>
                <FormField name='firstName' label="Prénom" onChange={(e) => setFirstName(e.target.value)}/>
                <FormField name='lastName' label="Nom" onChange={(e) => setLastName(e.target.value)}/>
                <FormField name='email' label="Email" onChange={(e) => setEmail(e.target.value)}/>
                <FormField name='plainPassword' label="Mot de passe"
                           onChange={(e) => setPlainPassword(e.target.value)}/>
                <FormField name='firstHiredAt' type="date" label="Date de première embauche"
                           onChange={(e) => setFirstHiredAt(e.target.value)}/>
                <div>
                    <label htmlFor="role">Rôle</label>
                    <select 
                        id="role" 
                        name="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="employee">Employé</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </div>
                <Button type='submit'>Enregistrer</Button>
            </form>
        </section>
    </main>);
}
