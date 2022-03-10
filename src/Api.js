const userApi = 'https://assessment.api.vweb.app/user';
const ridesApi = 'https://assessment.api.vweb.app/rides';

class CustomError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}

const fetchData  = async (url) => {
    let response = await fetch(url);
    let jsonData = await response.json();
    if(response.status === 200){
        return jsonData;
    } else {
        throw new CustomError(jsonData?.detail || "Something Went Wrong ." ,response.status || 500)
    }
}


export default fetchData;
export { userApi, ridesApi };