const ENDPOINTS = {
    GET_ENTRIES: '/api/entries',
    UPDATE_ENTRY: id => `/api/entries/${id}`,
    DELETE_ENTRY: id => `/api/entries/${id}`,
    CREATE_ENTRY: '/api/entries',
    RESET_SEASON: '/api/season/resetseason',
};

export default ENDPOINTS;