import { observer } from 'mobx-react';
import * as React from 'react';
import UIDataModel from '../../UIDataModel';
import GeoLabelnfo from '../GeoLabelnfo';
import GeoLabelsComponent from '../GeoLabelsComponent';
import './index.css';

export default observer(({uiDataModel}: { uiDataModel: UIDataModel }) => {
    return (
        <div>
            <GeoLabelsComponent geoLabelsData={uiDataModel.geoLabelsData}/>
            <GeoLabelnfo uiDataModel={uiDataModel}/>
        </div>
    );
});