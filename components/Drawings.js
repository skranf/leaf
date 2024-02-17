import { Dimensions } from 'react-native';
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

let path = Skia.Path.Make();

export function drawingsSystem(entities, { touches })
{
    const drawingsEntities = entities.drawings;
    touches.filter(t => t.type === "start").forEach(t => {
        path.moveTo(t.event.pageX, t.event.pageY);
    });
    touches.filter(t => t.type === "end").forEach(t => {
        path.lineTo(t.event.pageX, t.event.pageY);
        drawingsEntities.paths.push(path);
        path = Skia.Path.Make();
        drawingsEntities.translates.push(0);
    });
    return entities;
};

export function scrollDrawingsSystem(entities)
{
    const drawingsEntities = entities.drawings;
    const backgroundEntity = entities.background;
    const translates = drawingsEntities.translates;
    for (let index=0; index<translates.length; index++) translates[index] -= backgroundEntity.scrollSpeed;
    return entities;
};

export default function Drawings(props)
{
    const { width, height } = Dimensions.get('window');

    return (
        <Canvas style={{ width, height }}>        
        {
            props.paths.map((path, index) =>
                <Path
                    key={index}
                    path={path}
                    style="stroke"
                    strokeWidth={5}
                    color={"grey"}
                    transform={[{ translateX: props.translates[index] }]}
                />
            )
        }

            
        </Canvas>
    );
};