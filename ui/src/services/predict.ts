import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3000';

export const getNamePrediction = async (name: string) => {
    const isName = await axios.post('/predict', { word: name })
    return isName.data
}
