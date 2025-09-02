import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import {faEdit} from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'
import {useParams} from "react-router-dom";

function DetailUser() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    useEffect(() => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + '/users/' + params.id)
            .then((response) => response.json())
            .then((response) => {
                setUser(response);
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
                    title={"Detail du collaborateur " +params.id}
                    actionButton={<Button icon={faEdit} color="warning"
                                          to={'/users/edit/' + params.id}>Modifier</Button>}
                />

                <section>
                    {loading ? (
                        <Loading message="Chargement des postes..."/>
                    ) : (
                        <>
                            <dl>
                                <dt>ID</dt>
                                <dd>{user.id}</dd>
                                <dt>Nom</dt>
                                <dd>{user.lastName}</dd>
                                <dt>Prénom</dt>
                                <dd>{user.firstName}</dd>
                                <dt>email</dt>
                                <dd>{user.email}</dd>
                                <dt>Date de première embauche</dt>
                                <dd>{user.firstHiredAt}</dd>
                            </dl>
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}

export default DetailUser;