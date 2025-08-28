import {useState, useEffect} from "react";
import fetchWithJWT from '../../utils/fetcWithJWT.js';

export default function EntityPicker({
                                         entityType,
                                         onEntitySelect,
                                         initialValue,
                                         label,
                                         renderOption
                                     }) {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mapping of entity types to their API endpoints and ID extraction
    const entityConfig = {
        users: {
            endpoint: '/users',
            apiPath: '/api/users/',
            idRegex: /\/api\/users\/(\d+)/
        },
        restaurants: {
            endpoint: '/restaurants',
            apiPath: '/api/restaurants/',
            idRegex: /\/api\/restaurants\/(\d+)/
        },
        jobTitles: {
            endpoint: '/job_titles',
            apiPath: '/api/job_titles/',
            idRegex: /\/api\/job_titles\/(\d+)/
        }
    };

    // Validate and get configuration for the entity type
    const config = entityConfig[entityType];
    if (!config) {
        throw new Error(`Unsupported entity type: ${entityType}`);
    }

    useEffect(() => {
        fetchWithJWT(import.meta.env.VITE_WACDO_BACK_API_URL + config.endpoint)
            .then((response) => response.json())
            .then((response) => {
                const fetchedEntities = response.member || [];
                setEntities(fetchedEntities);
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Failed to fetch ${entityType}:`, error);
                setLoading(false);
            });
    }, []);

    const handleEntityChange = (e) => {
        onEntitySelect(e.target.value);
    };

    // Default option renderer if not provided
    const defaultOptionRenderer = (entity) => {
        switch (entityType) {
            case 'users':
                return `${entity.firstName} ${entity.lastName}`;
            case 'restaurants':
                return `${entity.name} - ${entity.city}`;
            case 'jobTitles':
                return entity.name;
            default:
                return JSON.stringify(entity);
        }
    };

    const optionRenderer = renderOption || defaultOptionRenderer;

    return (
        <div>
            <label role={`${entityType}-selection`} htmlFor={`${entityType}-selection`}>
                {label || entityType.charAt(0).toUpperCase() + entityType.slice(1)}
            </label>
            {loading ? (
                <select disabled id={`${entityType}-selection`}>
                    <option>Chargement...</option>
                </select>
            ) : (
                <select
                    role="listbox"
                     id={`${entityType}-selection`}
                    value={initialValue}
                    onChange={handleEntityChange}
                >
                    <option value="">Sélectionner un {label || entityType}</option>
                    {entities.map((entity) => (
                        <option key={entity.id} value={entity['@id']}>
                            {optionRenderer(entity)}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
} 