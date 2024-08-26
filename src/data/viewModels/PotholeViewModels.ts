import {useState, useEffect} from 'react';
import PotholeModel, {Pothole} from '../models/PotholeModel';

interface PotholeViewModel {
    potholes: Pothole[],
    loading: boolean,
    error: Error | null;
}

export const usePotholeViewModel = (): PotholeViewModel => {
    const [potholes, setPotholes] = useState<Pothole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const loadPotholes = async () => {
        try {
          const data = await PotholeModel.fetchPotholes();
          setPotholes(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      loadPotholes();
    }, []);
    
    return {
        potholes,
        loading,
        error,
    };
};