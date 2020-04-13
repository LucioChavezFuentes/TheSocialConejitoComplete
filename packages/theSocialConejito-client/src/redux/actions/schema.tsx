import {schema} from 'normalizr';

export const scream = new schema.Entity('screams', undefined, { idAttribute: 'screamId' });
export const arrayOfScreams = new schema.Array(scream);