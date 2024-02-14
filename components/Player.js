import {Image, View} from 'react-native';

export const PLAYER_SPRITESHEET_WIDTH = 384;
export const PLAYER_SPRITESHEET_HEIGHT = 64;
export const PLAYER_SPRITESHEET_FRAME = 64;

export function playerSystem(entities)
{
    const playerEntity = entities.player;
    playerEntity.scrollFrame += playerEntity.scrollSpeed;
    if ((playerEntity.scrollFrame % PLAYER_SPRITESHEET_FRAME) == 0)
    {
        playerEntity.currentFrame = playerEntity.scrollFrame;
    }
    if (playerEntity.scrollFrame > 384)
    {
        playerEntity.currentFrame = 0;
        playerEntity.scrollFrame = 0;
    }
    return entities;
};

export default function Player(props)
{
    const playerSpriteSheetSource = require('../assets/player.png');
    return (
        <View style={{
            position: 'absolute',
            left: props.x,
            bottom: props.y,
            height: PLAYER_SPRITESHEET_HEIGHT,
            width: PLAYER_SPRITESHEET_FRAME,
            overflow: 'hidden'
        }}>
            <Image
                source={playerSpriteSheetSource}
                style={{
                    margin:0,
                    padding:0,
                    height: PLAYER_SPRITESHEET_HEIGHT,
                    width: PLAYER_SPRITESHEET_WIDTH,
                    transform: [{ translateX: - props.currentFrame }],
                }}
            />
        </View>
    );
};