import axios from "axios";

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
            const response = await axios.get('/pothole');
            return response.data.map((item:any) => ({
                id: item.id,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng),
                image: item.image,
                done: item.done,
            }));
        } catch (error) {
            console.error('Failed to fetch potholes:', error);
            throw error;
        }
    }
}