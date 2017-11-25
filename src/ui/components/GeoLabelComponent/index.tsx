import * as React from 'react';
import GeoLabel from '../../../world/GeoLabel';
import './index.css';

export default ({geoLabel}: { geoLabel: GeoLabel }) => {
    return (
        <div
            className="geoLabel"
            style={{
                position: 'absolute',
                top: 10,
                left: 10,
            }}

        >
            {geoLabel.label}
        </div>
    );
};