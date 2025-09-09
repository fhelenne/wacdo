import {useState, useEffect} from "react";
import fetchWithJWT from '../../utils/fetcWithJWT.js';
import {useForm} from "react-hook-form";

export function EntityPicker({
                                 entityType,
                                 onEntitySelect,
                                 disabled,
                                 initialValue,
                                 label,
                                 renderOption,
                                 register: parentRegister,
                                 errors: parentErrors,
                                 setValue: parentSetValue
                             }) {
    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState(initialValue ?? '');

    // Use parent's register if provided, otherwise use local form
    const {
        register: localRegister,
        formState: {errors: localErrors},
        setValue: localSetValue,
    } = useForm({
        mode: 'all',
        defaultValues: {
            [entityType]: initialValue ?? ''
        }
    });

    // Choose between parent or local register/errors/setValue
    const register = parentRegister || localRegister;
    const errors = parentErrors || localErrors;
    const setValue = parentSetValue || localSetValue;

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
                const fetchedEntities = response['member'] || [];
                setEntities(fetchedEntities);
                setLoading(false);

                // If initialValue is provided, try to find the matching entity
                if (initialValue) {
                    const matchingEntity = fetchedEntities.find(
                        entity => entity['@id'] === initialValue
                    );
                    if (matchingEntity) {
                        setSelectedValue(initialValue);
                        // Ensure form value is set
                        setValue(entityType, initialValue);
                    }
                }
            })
            .catch((error) => {
                console.error(`Failed to fetch ${entityType}:`, error);
                setLoading(false);
            });
    }, [config.endpoint, entityType, initialValue, setValue]);

    // Update useEffect to handle changes to initialValue after initial render
    useEffect(() => {
        if (initialValue && entities.length > 0) {
            const matchingEntity = entities.find(
                entity => entity['@id'] === initialValue
            );
            if (matchingEntity) {
                setSelectedValue(initialValue);
                // Ensure form value is set
                setValue(entityType, initialValue);
            }
        }
    }, [initialValue, entities, entityType, setValue]);

    // Validation function for entity selection
    const validateEntitySelection = (value) => {
        // Check if a value is selected (not empty)
        if (!value) {
            return 'Veuillez sélectionner un ' + (label || entityType);
        }

        // Optional: Additional validation logic specific to entity type
        switch (entityType) {
            case 'users':
                // Example: Ensure a valid user is selected
                return value.startsWith(config.apiPath) ? true : 'Sélection d\'utilisateur invalide';
            case 'restaurants':
                // Example: Ensure a valid restaurant is selected
                return value.startsWith(config.apiPath) ? true : 'Sélection de restaurant invalide';
            case 'jobTitles':
                // Example: Ensure a valid job title is selected
                return value.startsWith(config.apiPath) ? true : 'Sélection de poste invalide';
            default:
                return true;
        }
    };

    // Update handleEntityChange to work with form validation
    const handleEntityChange = (e) => {
        const newSelectedValue = e.target.value;

        // Update local state
        setSelectedValue(newSelectedValue);

        // Debugging logs
        console.log('EntityPicker Change:', {
            entityType,
            selectedValue: newSelectedValue,
            initialValue
        });

        // Update form value using parent or local setValue
        setValue(entityType, newSelectedValue);

        // Call the original onEntitySelect prop
        onEntitySelect(newSelectedValue);
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
                    name={entityType}
                    value={selectedValue}
                    {...register(entityType, {
                        validate: validateEntitySelection,
                        required: 'Veuillez sélectionner un ' + (label || entityType)
                    })}
                    onChange={!disabled ? handleEntityChange : null}
                    disabled={disabled ? true : null}
                >
                    <option value="">Sélectionner un {label || entityType}</option>
                    {entities.map((entity) => (
                        <option
                            key={entity.id}
                            value={entity['@id']}
                        >
                            {optionRenderer(entity)}
                        </option>
                    ))}
                </select>
            )}
            {errors[entityType] && <span className="message error">{errors[entityType]?.message}</span>}
        </div>
    );
} 