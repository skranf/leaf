import { Dimensions } from 'react-native';
import { Canvas, Path, Skia } from "@shopify/react-native-skia";

let path, lastPos, vectors;

function getCoordinates(path)
{
    const pathFromX = parseInt(path.toSVGString().split('M')[1].split(' ')[0]);
    const pathFromY = parseInt(path.toSVGString().split(' ')[1].split('L')[0]);
    const pathTo = path.toSVGString().split('L').pop().split(' ');
    const pathToX = parseInt(pathTo[0]);
    const pathToY = parseInt(pathTo[1]);
    // Drawing left to right
    if (pathFromX < pathToX) return {
        fromX: pathFromX,
        fromY: pathFromY,
        toX: pathToX,
        toY: pathToY,
        coef: (pathToY - pathFromY) / (pathToX - pathFromX)
    }
    // Drawing right to left
    else return {
        fromX: pathToX,
        fromY: pathToY,
        toX: pathFromX,
        toY: pathFromY,
        coef: (pathFromY - pathToY) / (pathFromX - pathToX)
    }
}

export function drawingsSystem(entities, { touches })
{
    const drawingsEntities = entities.drawings;
    touches.filter(t => t.type === "start").forEach(t => {
        path = Skia.Path.Make();
        path.moveTo(t.event.pageX, t.event.pageY);
        lastPos = {x: t.event.pageX, y: t.event.pageY};
        vectors = [];
    });
    touches.filter(t => t.type === "move").forEach(t => {
        const nextPos = {x: lastPos.x + t.delta.pageX, y: lastPos.y + t.delta.pageY};
        path.lineTo(nextPos.x, nextPos.y);
        vectors.push({x: Math.round(lastPos.x), v : Math.round(t.delta.pageY/t.delta.pageX)});
        lastPos = nextPos;
    });
    touches.filter(t => t.type === "end").forEach(t => {
        path.lineTo(t.event.pageX, t.event.pageY);
        drawingsEntities.paths.push(path);
        drawingsEntities.translates.push(0);
        drawingsEntities.vectors.push(vectors);
        drawingsEntities.coordinates.push(getCoordinates(path));
        console.log(getCoordinates(path));
    });
    return entities;
};

export function scrollDrawingsSystem(entities)
{
    const { width, height } = Dimensions.get('window');
    const drawingsEntities = entities.drawings;
    const backgroundEntity = entities.background;
    const translates = drawingsEntities.translates;
    for (let index=0; index<translates.length; index++) translates[index] -= backgroundEntity.scrollSpeed;
    // Shift drawings out of screen 
    if (translates[0] < - width)
    {
        drawingsEntities.paths.shift();
        drawingsEntities.translates.shift();
        drawingsEntities.coordinates.shift();
    }
    //console.log(translates);
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