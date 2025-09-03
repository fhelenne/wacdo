import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import {useEffect, useState} from "react";
import fetchWithAuth from '../utils/fetcWithJWT.js';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {notify} from "../utils/notify.js";
import {useForm} from "react-hook-form";

export default function EditJobTitle() {
    const [title,setTitle] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm()
    useEffect(() => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/'+params.id,{
          method: "GET"
        }).then((response) => response.json())
          .then(response => {
            setTitle(response.name);
            setValue('name',response.name)
        });
    }, [params]);

    const onSubmit = () => {
        fetchWithAuth(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/'+params.id,{
          method: "PATCH",
          body: JSON.stringify({ name: title }),
          // …
        })
        .then(response => {
            if (response.ok) {
                notify.success('poste enregistré', {});
                navigate('/job-titles');
            } else {
                notify.error('Erreur lors de la modification du poste', {});
            }
        })
    }

  return (  <main role="dashboard">
      <section>
        <PageHeader
          title={"Modifier le poste "+title}
          description=""
        />
          <form role="form" onSubmit={handleSubmit(onSubmit)}>
              <div>
                    <label htmlFor="job_title-name">Nom du poste</label>
                    <input
                        id='job_title-name'
                        name='name'
                        value={title}
                        {...register('name', {required: 'Le nom du poste est obligatoire.'})}
                        data-form-type="other"
                        onChange={(e) => {setTitle(e.target.value);setValue('name',e.target.value )}}
                    />
                    {errors.name && <span className="message error">{errors.name?.message}</span>}
                </div>
              <Button type='submit'>Enregistrer</Button>
          </form>
      </section>
  </main>);
}
