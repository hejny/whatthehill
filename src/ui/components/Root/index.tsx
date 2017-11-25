import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../../UIDataModel';
import GeoLabel from '../GeoLabelComponent';
import './index.css';

export default observer(({uiDataModel}:{uiDataModel:UIDataModel})=>{
    return(
        <div>
            {uiDataModel.geoLabels.map((geoLabel,i)=><GeoLabel key={i} geoLabel={geoLabel}/>)}
        </div>
    );
});