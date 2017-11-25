import * as React from 'react';
import {IGeoLabelData} from '../../UIDataModel';
import './index.css';

export default ({geoLabelsData}: { geoLabelsData: IGeoLabelData[] }) => {


    return (
        <ul className="geoLabels">

            {geoLabelsData.map((geoLabelData, i) => (

                <li key={i} className={geoLabelData.type} style={{
                    display: geoLabelData.onScreen.visible ? 'block' : 'none',
                    position: 'absolute',
                    top: geoLabelData.onScreen.position.y,
                    left: geoLabelData.onScreen.position.x,
                }}>
                    <h2>{geoLabelData.title}</h2>
                    1&nbsp;560
                </li>

            ))}

        </ul>
    );
};