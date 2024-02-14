import {Image, View, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export function backgroundSystem(entities)
{
    const backgroundEntity = entities.background;
    backgroundEntity.x -= backgroundEntity.scrollSpeed;
    if (backgroundEntity.x < -width)
    {
        backgroundEntity.x = 0;
    }
    return entities;
};

export default function Background(props){
    
    const backgroundImageSource = require('../assets/background.png');

    return (
        <View style={{ position: 'absolute', left: props.x, top: 0, flexDirection: 'row' }}>
            <Image source={backgroundImageSource} style={{ width, height }} />
            <Image source={backgroundImageSource} style={{ width, height }} />
        </View>
    );
};