import * as React from 'react';
import { IGeoLabelData } from '../../UIDataModel';
import './index.css';

export default ({geoLabelsData}: { geoLabelsData: IGeoLabelData[] }) => {


    return (
        <ul className="geoLabels">

            {geoLabelsData.filter((geoLabelData)=>geoLabelData.title||''!=='').map((geoLabelData, i) => (

                <li key={i} style={{
                    backgroundColor: geoLabelData.color,
                    opacity: geoLabelData.onScreen.visible ? 1 : 0,
                    position: 'absolute',
                    top: geoLabelData.onScreen.position.y,
                    left: geoLabelData.onScreen.position.x,
                }}>
                    <h2>{geoLabelData.title}</h2>
                </li>

            ))}

        </ul>
    );
};