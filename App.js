import { GameEngine } from 'react-native-game-engine';
import Player, { playerSystem } from './components/Player';
import Background, { backgroundSystem } from './components/Background';

export default function App()
{
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
                    x: 100,
                    y: 100,
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
