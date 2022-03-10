import React from 'react';

import './Ride.scss';

const Ride = ({ data }) => {
    return (
            <div className="desktop__body__ride">
                <div className="desktop__body__ride__map">
                    <img src={ data?.map_url } alt="ride"/>
                </div>
                <div className="desktop__body__ride__info">
                    <div className="desktop__body__ride__info__id">Ride Id : { data?.id } </div>
                    <div className="desktop__body__ride__info__origin">Origin Station : { data?.origin_station_code } </div>
                    <div className="desktop__body__ride__info__path">Station Path : { String(data?.station_path) } </div>
                    <div className="desktop__body__ride__info__date">Date: { data?.date } </div>
                    <div className="desktop__body__ride__info__id">Distance : { data?.distance } </div>
                    <div className="desktop__body__ride__info__location">
                        <div className="desktop__body__ride__info__city">{ data?.city } </div>
                        <div className="desktop__body__ride__info__state">{ data?.state } </div>
                    </div>
                </div>
            </div>
    )
}

export default Ride;