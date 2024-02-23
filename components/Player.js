import {Image, View, Dimensions} from 'react-native';

export const PLAYER_SPRITESHEET_WIDTH = 384;
export const PLAYER_SPRITESHEET_HEIGHT = 64;
export const PLAYER_SPRITESHEET_FRAME = 64;
export const PLAYER_POS_Y_RATIO = 0.70;
const PLAYER_CLUTTER = 64;


export function playerSystem(entities)
{
    const { width, height } = Dimensions.get('window');
    const playerEntity = entities.player;
    const drawingsEntities = entities.drawings;
    const drawingsCoordinates = drawingsEntities.coordinates;
    const drawingsTranslates = drawingsEntities.translates;
    const drawingsVectors = drawingsEntities.vectors;

    // Check drawings : UP -> DOWN
    if (drawingsCoordinates.length == 0) playerEntity.y = Math.round(height*PLAYER_POS_Y_RATIO);
    for (let index=0; index<drawingsCoordinates.length; index++)
    {
        const checkDrawingsActiveXFrom = ((playerEntity.x + PLAYER_CLUTTER) > (drawingsCoordinates[index].fromX + drawingsTranslates[index]));
        const checkDrawingsActiveXTo = ((playerEntity.x - PLAYER_CLUTTER) < (drawingsCoordinates[index].toX + drawingsTranslates[index]));
        const checkDrawingsActiveYFrom = (playerEntity.y < (drawingsCoordinates[index].fromY));
        if (checkDrawingsActiveXFrom && checkDrawingsActiveXTo && checkDrawingsActiveYFrom)
        {
            const playerUp = ((playerEntity.x) < (drawingsCoordinates[index].toX + drawingsTranslates[index]));
            if (playerUp)
            {
                const vectors = drawingsVectors[index].filter( v => ((v.x + drawingsTranslates[index]) <= playerEntity.x + PLAYER_CLUTTER));
                if ((vectors.length > 0) && ((playerEntity.y + PLAYER_CLUTTER) > drawingsCoordinates[index].toY)) playerEntity.y = playerEntity.y + vectors[0].v/2;
            }
            else playerEntity.y = Math.round(height*PLAYER_POS_Y_RATIO);
        }
    } 

    // Scroll frames
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
            top: props.y,
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