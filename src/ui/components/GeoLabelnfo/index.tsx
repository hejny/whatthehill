import * as React from 'react';
import {observer} from 'mobx-react';
import UIDataModel from '../../UIDataModel';
import './index.css';

export default observer(({uiDataModel}: { uiDataModel: UIDataModel }) => {


    return (
        <main className={['GeoLabelInfo',uiDataModel.geoLabelsData.length===0?'empty':'filled'].join(' ')}
        >


            {uiDataModel.geoLabelsData.map((geoLabelData, i) => (
                <div key={i}>
                    <h1>{geoLabelData.title}</h1>
                    <p>esdf wrgsdwersg rsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh w4retdhersgfrsg wrshdferstgh
                        w4retdhersgfwrshdferstgh w4retdhersgf</p>
                </div>

            ))}

        </main>
    );


});