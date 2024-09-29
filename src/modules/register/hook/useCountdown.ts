import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AppState} from 'react-native';

let subscription;
let timerId;

export const useCountdown = (remainingMs?: number, isResetFocus?: boolean) => {
    const [ms, setMs] = useState<number | undefined>(undefined);

    const msRef = useRef<number | undefined>(ms);
    const appState = useRef(AppState.currentState);
    const timeStartBG = useRef<number>(0);

    useEffect(() => {
        if (remainingMs !== undefined) {
            const msFloor = Math.floor(remainingMs / 1000 + (remainingMs % 1000 > 0 ? 1 : 0)) * 1000;
            setMs(msFloor);
        }
    }, [remainingMs]);

    useEffect(() => {
        msRef.current = ms;
    }, [ms]);

    const roundedMs = (num?: number) => {
        return Math.ceil((num || 0) / 1000) * 1000;
    };

    useEffect(() => {
        subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                const timeOnBg = dayjs().valueOf() - timeStartBG.current;
                const currentCountdown = msRef.current - timeOnBg;
                setMs(currentCountdown > 0 ? roundedMs(currentCountdown) : 0);
            } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
                timeStartBG.current = dayjs().valueOf();
            }

            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                if (isResetFocus) {
                    subscription.remove();
                    clearInterval(timerId);
                }
            };
        }, [])
    );

    useEffect(() => {
        if (Number(ms) > 0) {
            timerId = setInterval(() => setMs((prevMs) => roundedMs(prevMs) - 1000), 1000);
            return () => clearInterval(timerId);
        }
    }, [ms]);

    const reset = (milisecond?: number) => {
        setMs(milisecond || remainingMs);
    };

    const setCountdownTime = (milisecond: number) => {
        setMs(milisecond);
    };

    const clear = () => {
        subscription.remove();
        clearInterval(timerId);
    };

    return {
        ms,
        reset,
        setCountdownTime,
        clear,
    };
};
