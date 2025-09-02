import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {EntityPicker} from "../components/forms/EntityPicker.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";

export default function EditUser() {
     const formatDateToInput = (isoDate) => {
        if (!isoDate) return ''; // Gérer les cas sans valeur
        return new Date(isoDate).toISOString().split('T')[0]; // Extraire uniquement la partie "YYYY-MM-DD"
    };

    const getRoleFromRoles = (roles) => {
        return roles && roles.includes('ROLE_ADMIN') ? 'admin' : 'employee';
    };

    const getRoles = (selectedRole) => {
        return selectedRole === 'admin' ? ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] : ['ROLE_EMPLOYEE'];
    };

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [firstHiredAt,setFirstHiredAt] = useState('');
    const [email,setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [role, setRole] = useState('employee');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/'+params.id,{
          method: "GET"
        }).then((response) => response.json())
          .then(response => {
            setFirstName(response.firstName);
            setLastName(response.lastName);
            setFirstHiredAt(formatDateToInput(response.firstHiredAt));
            setEmail(response.email);
            setJobTitle(response.jobTitle);
            setRole(getRoleFromRoles(response.roles));
        });
    }, [params]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/'+params.id,{
          method: "PATCH",
          body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              firstHiredAt: firstHiredAt,
              email: email,
              jobTitle: jobTitle,
              roles: getRoles(role)
          }),
        }).then(response => {
            if (response.ok) {
                notify.success('Collaborateur modifié', {});
                navigate('/users');
            } else {
                notify.error('Erreur lors de la modification du collaborateur', {});
            }
        })
        .catch(error => {
            // notify.error('Erreur de connexion'+error, {});
        });
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title= {"Modifier le collaborateur "+firstName+" "+lastName}
          description=""
        />
          <form role="form" onSubmit={handleOnSubmit}>
              <FormField name='firstName' label="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              <FormField name='lastName' label="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              <FormField name='email' label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <FormField name='firstHiredAt' type="date" label="Date de première embauche" value={firstHiredAt} onChange={(e) => setFirstHiredAt(e.target.value)}/>
              <EntityPicker 
                entityType="jobTitles"
                label="Poste"
                initialValue={jobTitle}
                onEntitySelect={(selectedJobTitleId) => setJobTitle(selectedJobTitleId)}
              />
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
