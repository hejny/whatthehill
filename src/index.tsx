import World from './world/World';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './ui/components/Root';
import UIDataModel from './ui/UIDataModel';
import './index.css';

const uiDataModel = new UIDataModel();

const canvasElement = document.getElementById("scene") as HTMLCanvasElement;
const uiElement = document.getElementById("ui") as any;


const world = new World(canvasElement);
world.run(uiDataModel);
//console.log(world);


ReactDOM.render(
    <Root uiDataModel={uiDataModel}/>,
    uiElement
);

