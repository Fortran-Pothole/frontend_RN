import axios from "axios";
import Config from 'react-native-config';


export interface Pothole {
    id:number;
    latitude:number;
    longitude: number;
    image: String;
    done: number;
}

export default class PotholeModel {
    static async fetchPotholes(): Promise<Pothole[]> {
        try {
            const url = `${Config.BASE_URL}/pothole/`;
            console.log('Request URL:', url);
            const response = await axios.get(`${Config.BASE_URL}/pothole/`);
            console.log('Pothole Data:', response.data);
            return response.data.map((item:any) => ({
                id: item.id,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
                image: item.image,
                done: item.done,
            }));
        } catch (error) {
            console.error('Failed to fetch potholes:', error);
        }
    }
}