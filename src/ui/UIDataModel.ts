import {observable,computed} from "mobx";
//import GeoLabel from "../world/GeoLabel";

interface IMessage{date:Date,text:string}
interface IVector2{x:number,y:number}
interface ILinkArea{position:IVector2,size:IVector2,title:string,url:string}

export interface IGeoLabelData{
    title: string;
    type: string;
    onScreen: {
        visible: boolean;
        position:{
            x:number;
            y:number;
        }

    }
}

export default class UIDataModel {
    @observable geoLabelsData:IGeoLabelData[] = [];
}
