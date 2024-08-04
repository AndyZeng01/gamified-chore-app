import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type PointsContextType = {
    counter: number;
    points: number;
    allPoints: number;
    maxStreak: number;
    incrementPoints: () => void;
    incrementCounter: () => void;
    roundFee: () => void;
    incrementAllPoints: () => void;
    getMax: (currScore: number) => void;  
};

const PointsContext = createContext<PointsContextType | undefined>(undefined);

export function PointsProvider({ children }: { children: ReactNode }) {
    const [points, setPoints] = useState(() => {
        const savedPoints = localStorage.getItem('points');
        return savedPoints ? Number(savedPoints) : 0;
    });

    const [allPoints, setAllPoints] = useState(() => {
        const savedAllPoints = localStorage.getItem('allPoints');
        return savedAllPoints ? Number(savedAllPoints) : 0;
    });

    const [counter, setCounter] = useState(() => {
        const savedCounter = localStorage.getItem('counter');
        return savedCounter ? Number(savedCounter) : 0;
    });

    const [maxStreak, setMaxStreak] = useState(() => {
        const savedMaxStreak = localStorage.getItem('maxStreak');
        return savedMaxStreak ? Number(savedMaxStreak) : 0;
    });

    useEffect(() => {
        localStorage.setItem('points', points.toString());
        localStorage.setItem('allPoints', allPoints.toString());
        localStorage.setItem('counter', counter.toString());
        localStorage.setItem('maxStreak', maxStreak.toString());
    }, [points, allPoints, counter, maxStreak]);

    const incrementPoints = () => {
        setPoints(points + 20);
    };

    const getMax = (currScore: number) => { 
        if (currScore > maxStreak) {
            setMaxStreak(currScore);
        }
    };

    const incrementAllPoints = () => {
        setAllPoints(allPoints + 1);
    };

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    const roundFee = () => {
        setPoints(points - 10);
    };

    return (
        <PointsContext.Provider value={{ 
            counter, points, allPoints, maxStreak,
            incrementPoints, incrementCounter, roundFee, incrementAllPoints, getMax }}>
            {children}
        </PointsContext.Provider>
    );
}

export function usePoints() {
    const context = useContext(PointsContext);
    if (context === undefined) {
        throw new Error('usePoints must be used within a PointsProvider');
    }
    return context;
}
