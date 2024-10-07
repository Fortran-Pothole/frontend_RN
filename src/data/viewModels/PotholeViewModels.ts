import { useState, useEffect } from 'react';
import PotholeModel, { Pothole } from '../models/PotholeModel';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
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
    const [speed, setSpeed] = useState<number>(90); 

    const fetchPotholes = async () => {
        try {
            setLoading(true);
            const data = await PotholeModel.fetchPotholes();
            setPotholes(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPotholes();
        //WebSocket connection setup
        const socket = new SockJS('http://15.164.200.30:8080/socket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log(str);
            },
            onConnect: (frame) => {
                console.log('Connected: ' + frame);
                stompClient.subscribe('/topic/km-h', (message) => {
                    console.log('Received message:', message.body);
                    const receivedSpeed = parseFloat(message.body);
                    setSpeed(receivedSpeed || 60);
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error: ', frame);
            },
            onWebSocketError: (error) => {
                console.error("WebSocket error:", error);
            },
            onWebSocketClose: () => {
                console.log("WebSocket connection closed");
            }
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
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