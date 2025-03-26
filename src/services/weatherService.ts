import axios from 'axios';

const API_KEY = 'SE0OKM3W09Iqea3hi';
const BASE_URL = 'https://api.seniverse.com/v3/weather/daily.json';

export const getWeatherForecast = async (city: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&location=${city}&language=zh-Hans&unit=c&start=0&days=7`
    );
    return response.data;
  } catch (error) {
    console.error('获取天气数据失败:', error);
    throw error;
  }
};
