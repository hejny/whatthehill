import * as React from 'react';
import {IGeoLabelData} from '../../UIDataModel';
import './index.css';

export default ({geoLabelsData}: { geoLabelsData: IGeoLabelData[] }) => {


    return (
        <ul className="geoLabels">

            {geoLabelsData.map((geoLabelData, i) => (

                <li key={i} style={{
                    display: geoLabelData.onScreen.visible ? 'block' : 'none',
                    position: 'absolute',
                    top: geoLabelData.onScreen.position.y,
                    left: geoLabelData.onScreen.position.x,
                }}>
                    {geoLabelData.title}
                </li>

            ))}

        </ul>
    );
};