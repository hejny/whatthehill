import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../../UIDataModel';
import GeoLabelsComponent from '../GeoLabelsComponent';
import GeoLabelnfo from '../GeoLabelnfo';
import './index.css';

export default observer(({uiDataModel}: { uiDataModel: UIDataModel }) => {
    return (
        <div>
            <GeoLabelsComponent geoLabelsData={uiDataModel.geoLabelsData}/>
            <GeoLabelnfo uiDataModel={uiDataModel}/>
        </div>
    );
});