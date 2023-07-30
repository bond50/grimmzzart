const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_PRODUCTION : process.env.REACT_APP_API_DEVELOPMENT;

export {API_URL};
