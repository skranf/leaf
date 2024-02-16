import {Image, View, Dimensions} from 'react-native';

export function backgroundSystem(entities)
{
    const { width, height } = Dimensions.get('window');
    const backgroundEntity = entities.background;
    backgroundEntity.x -= backgroundEntity.scrollSpeed;
    if (backgroundEntity.x < -width)
    {
        backgroundEntity.x = 0;
    }
    return entities;
};

export default function Background(props)
{
    const backgroundImageSource = require('../assets/background.png');
    const { width, height } = Dimensions.get('window');
    return (
        <View style={{ position: 'absolute', left: props.x, top: 0, flexDirection: 'row' }}>        
            <Image source={backgroundImageSource} style={{ width, height, resizeMode: 'stretch'}} />
            <Image source={backgroundImageSource} style={{ width, height, resizeMode: 'stretch'}} />
        </View>
    );
};