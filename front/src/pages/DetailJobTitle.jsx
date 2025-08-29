import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import {faEdit} from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'
import {useParams} from "react-router-dom";

function EditJobTitle() {
    const [jobTitle, setJobTitle] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    useEffect(() => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + '/job_titles/' + params.id)
            .then((response) => response.json())
            .then((response) => {
                setJobTitle(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);



    return (
        <main role="jobtitle">
            <section>
                <PageHeader
                    title="Detail du poste"
                    actionButton={<Button icon={faEdit} color="warning"
                                          to={'/job-titles/edit/' + params.id}>Modifier</Button>}
                />

                <section>
                    {loading ? (
                        <Loading message="Chargement des postes..."/>
                    ) : (
                        <>
                            <dl>
                                <dt>ID</dt>
                                <dd>{jobTitle.id}</dd>
                                <dt>Nom</dt>
                                <dd>{jobTitle.name}</dd>
                            </dl>
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}

export default EditJobTitle;