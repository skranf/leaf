import { GameEngine } from 'react-native-game-engine';
import * as ScreenOrientation from 'expo-screen-orientation';
import Player, { playerSystem } from './components/Player';
import Background, { backgroundSystem } from './components/Background';
import { useEffect } from 'react';

async function changeScreenOrientation()
{
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
}


export default function App()
{
    useEffect(() => { changeScreenOrientation()}, []);

    return (
        <GameEngine
            style={{ flex: 1 }}
            systems={[playerSystem, backgroundSystem]}
            entities=
            {{
                background:
                {
                    x: 0,
                    scrollSpeed: 1,
                    renderer: Background,
                },
                player:
                {
                    x: 80,
                    y: 50,
                    scrollSpeed: 16,
                    scrollFrame: 0,
                    currentFrame: 0,
                    renderer: Player,
                },
            }}
        >
        </GameEngine>
    );
};
