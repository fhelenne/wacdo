import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
import {useForm} from "react-hook-form";

export default function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [plainPassword, setPlainPassword] = useState('');
    const [firstHiredAt, setFirstHiredAt] = useState('');
    const [role, setRole] = useState('employee');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: 'all'})
    const getRoles = (selectedRole) => {
        return selectedRole === 'admin' ? ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] : ['ROLE_EMPLOYEE'];
    };

    const onSubmit = () => {
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
    }

    return (<main role="dashboard">
        <section>
            <PageHeader
                title="Créer un collaborateur"
                description=""
            />
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="user-firstName">Prénom</label>
                    <input
                        id='user-firstName'
                        name='firstName'
                        {...register('firstName', {required: "le prénom est obligatoire"})}
                        data-form-type="other"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <span className="message error">{errors.firstName?.message}</span>}
                </div>
                <div>
                    <label htmlFor="user-lastName">Nom</label>
                    <input
                        id='user-lastName'
                        name='lastName'
                        {...register('lastName', {required: "le nom est obligatoire"})}
                        data-form-type="other"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <span className="message error">{errors.lastName?.message}</span>}
                </div>
                <div>
                    <label htmlFor="user-email">Email</label>
                    <input
                        id='user-email'
                        name='email'
                        {...register('email', {
                            required: "l'email est obligatoire",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Veuillez verifier l\'adresse email',
                            },
                        })}
                        data-form-type="other"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="message error">{errors.email?.message}</span>}
                </div>
                <div>
                    <label htmlFor="user-plainPassword">Mot de passe</label>
                    <input
                        id='user-plainPassword'
                        name='plainPassword'
                        {...register('plainPassword', {
                            required: "le mot de passe est obligatoire",
                            minLength: {
                                value: 3,
                                message: "Le mot de passe doit contenir au moins 3 caractères"
                              }
                        })}
                        data-form-type="other"
                        onChange={(e) => setPlainPassword(e.target.value)}
                    />
                    {errors.plainPassword && <span className="message error">{errors.plainPassword?.message}</span>}
                </div>
                <div>
                    <label htmlFor="user-firstHiredAt">Date de première embauche</label>
                    <input
                        id='user-firstHiredAt'
                        name='firstHiredAt'
                        type="date"
                        {...register('firstHiredAt', {required: "la date est obligatoire"})}
                        data-form-type="other"
                        onChange={(e) => setFirstHiredAt(e.target.value)}
                    />
                    {errors.firstHiredAt && <span className="message error">{errors.firstHiredAt?.message}</span>}
                </div>
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
