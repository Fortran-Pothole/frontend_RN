import { useState, useEffect } from 'react';
import PotholeModel, { Pothole } from '../models/PotholeModel';

interface PotholeViewModel {
    potholes: Pothole[],
    loading: boolean,
    error: Error | null;
    speed: number;
    fetchPotholes: () => void;
}

export const usePotholeViewModel = (): PotholeViewModel => {
    const [potholes, setPotholes] = useState<Pothole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [speed, setSpeed] = useState<number>(60); 

    const fetchPotholes = async () => {
        try {
            setLoading(true);
            const data = await PotholeModel.fetchPotholes();
            setSpeed(speed);
            setPotholes(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPotholes();
        // WebSocket connection setup
        let ws;
        const connectWebSocket = () => {
            ws = new WebSocket('ws://poksin-webcam.site/socket');

            ws.onopen = () => {
                console.log('WebSocket connection opened.');
            };

            ws.onmessage = (event) => {
                const receivedSpeed = parseFloat(event.data);
                if (receivedSpeed + 60 !== speed) {
                    setSpeed(receivedSpeed + 60);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed. Reconnecting...');
                setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        connectWebSocket();

        return () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);
    
    return {
        potholes,
        loading,
        error,
        speed,
        fetchPotholes,
    };
};