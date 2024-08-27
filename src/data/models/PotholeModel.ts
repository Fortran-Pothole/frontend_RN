import axios from "axios";
import Config from 'react-native-config';


export interface Pothole {
    id:number;
    latitude:number;
    longitude: number;
    image: String;
    done: number;
    warning: number;
}

export default class PotholeModel {
    static async fetchPotholes(): Promise<Pothole[]> {
        try {
            const url = `${Config.BASE_URL}/pothole/`;
            console.log('Request URL:', url);
            const response = await axios.get(`${Config.BASE_URL}/pothole/`);
            console.log('Pothole Data:', response.data);
            // 데이터 검증 및 필터링
            return response.data
            .filter((item: any) => {
                const lat = parseFloat(item.lat);
                const lng = parseFloat(item.lng);
                // lat 또는 lng가 숫자가 아닌 경우 필터링
                return !isNaN(lat) && !isNaN(lng);
            })
            .map((item: any) => ({
                id: item.id,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
                warning: item.warning,
                image: item.image || '',
                done: item.done,
            }));
        } catch (error) {
            console.error('Failed to fetch potholes:', error);
        }
    }
    static async reportPothole(latitude: number, longitude: number): Promise<void> {
        try {
          const url = `${Config.BASE_URL}/pothole/`;
          const data = {
            lat: latitude.toString(),
            lng: longitude.toString(),
            image: "",
            done: -1,
          };
          console.log('Request Data:', data); // 요청 전에 데이터를 확인
          const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Pothole Reported:', response.data);
        } catch (error) {
          console.error('Failed to report pothole:', error.response?.data || error.message);
          throw error;
        }
    }
}