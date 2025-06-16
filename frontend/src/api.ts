import axios from 'axios';
import type { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchDataFromRoot = async (endpoint: string): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
