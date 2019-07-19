import { store } from '../_store/configureStore.jsx';

export const FILTER_CITIES = 'FILTER_CITIES';

export function filterCities(event) {
    return dispatch => {
        let cities = store.getState().common.cities;
        let countries = store.getState().common.countries;
        let choosenCountry = countries[event.target.selectedIndex];
        let filteredCities = cities.filter(x => x.countryId == choosenCountry.id);
        dispatch({
            type: FILTER_CITIES,
            payload: filteredCities,
        });
    };
}