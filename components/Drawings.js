import { Dimensions } from 'react-native';
import { Canvas, Path, Skia } from "@shopify/react-native-skia";

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
    });
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
                />
            )
        }

            
        </Canvas>
    );
};