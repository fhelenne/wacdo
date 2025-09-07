import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import {faEdit} from '../utils/icons.js';
import fetchWithJWT from '../utils/fetcWithJWT.js'
import {useParams} from "react-router-dom";

function DetailRestaurant() {
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(true);
    document.title = `Wacdo : Detail restaurant`;
    const params = useParams();
    useEffect(() => {
        setLoading(true);
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + '/restaurants/' + params.id)
            .then((response) => response.json())
            .then((response) => {
                setRestaurant(response);
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
                                          to={'/restaurants/edit/' + params.id}>Modifier</Button>}
                />

                <section>
                    {loading ? (
                        <Loading message="Chargement des postes..."/>
                    ) : (
                        <>
                            <dl>
                                <dt>ID</dt>
                                <dd>{restaurant.id}</dd>
                                <dt>Nom</dt>
                                <dd>{restaurant.name}</dd>
                                 <dt>Adresse</dt>
                                <dd>{restaurant.address}</dd>
                                 <dt>Code postal</dt>
                                <dd>{restaurant.zipCode}</dd>
                                 <dt>Ville</dt>
                                <dd>{restaurant.city}</dd>
                            </dl>
                        </>
                    )}
                </section>
            </section>
        </main>
    );
}

export default DetailRestaurant;