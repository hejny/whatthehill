interface IGeoJSONPoint {
    geometry:{
        type: "Point";
        coordinates: [number, number, number];
    }
}


export default class GeoPoint {

    constructor(public latitude: number,
                public longitude: number,
                public altitude: number,) {


    }

    static fromJSON(geoJson: IGeoJSONPoint) {
        if(typeof geoJson === 'undefined'){
            throw new Error(`Cant create GeoPoint form undefined.`);
        }
        if(typeof geoJson.geometry === 'undefined'){
            throw new Error(`Cant create GeoPoint form ${JSON.stringify(geoJson)}.`);
        }
        if(typeof geoJson.geometry.coordinates === 'undefined'){
            throw new Error(`Cant create GeoPoint form ${JSON.stringify(geoJson)}.`);
        }
        if(typeof geoJson.geometry.coordinates[2] !== 'number'){
            throw new Error(`Cant create GeoPoint form ${JSON.stringify(geoJson)}.`);
        }

        return new GeoPoint(
            geoJson.geometry.coordinates[0],
            geoJson.geometry.coordinates[1],
            geoJson.geometry.coordinates[2]
        )
    }

    /*toJson(): IGeoJSONPoint {
        return {
            type: "Point",
            coordinates: [
                this.latitude,
                this.longitude,
                this.altitude
            ]
        }

    }*/

    clone(): GeoPoint {
        return new GeoPoint(
            this.latitude,
            this.longitude,
            this.altitude
        );
    }

    normalizeInCage(min: GeoPoint, max: GeoPoint): GeoPoint {
        const normalizedPoint = this.clone();

        for (const coord of ['latitude', 'longitude', 'altitude']) {
            console.log(coord,normalizedPoint[coord] , min[coord],max[coord] , min[coord]);
            normalizedPoint[coord] = (normalizedPoint[coord] - min[coord]) / (max[coord] - min[coord]);
        }

        return normalizedPoint
    }
}