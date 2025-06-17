import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchRootMessage = async (): Promise<string> => {
  try {
    const { data } = await axios.get<string>(`${API_URL}`)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
