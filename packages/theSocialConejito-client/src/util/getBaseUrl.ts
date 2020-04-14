
// In development environment make sure to run the "serve:functions" command in order to run a local server for backend;

function getBaseUrl(){
    return process.env.NODE_ENV !== "production" ? (
        process.env.REACT_APP_DEV_BASE_URL ) : (
            process.env.REACT_APP_PROD_BASE_URL);
}

export default getBaseUrl;