import axios from 'axios';
import ENDPOINTS from './endpoints';

const Api = {};

Api.getEntries = () => axios.get(ENDPOINTS.GET_ENTRIES);

Api.updateEntry = (data) =>
    axios.put(ENDPOINTS.UPDATE_ENTRY(data.id), data);

Api.createEntry = data =>
    axios.post(ENDPOINTS.CREATE_ENTRY, data);

Api.deleteEntry = id =>
    axios.delete(ENDPOINTS.DELETE_ENTRY(id));

Api.resetSeason = data => 
    axios.post(ENDPOINTS.RESET_SEASON, data);

export default Api;