import * as React from 'react';
import GeoLabel from '../../../world/GeoLabel';
import './index.css';
import {isNull} from "util";

export default ({geoLabel}: { geoLabel: GeoLabel }) => {

    const positionOnScreen = geoLabel.positionOnScreen;
    const style:any = {
        display: positionOnScreen.visible?'block':'none',
        position: 'absolute',
        top: positionOnScreen.position.y,
        left: positionOnScreen.position.x,
    };

    return (
        <div className="geoLabel" style={style}>
            {geoLabel.label}
        </div>
    );
};