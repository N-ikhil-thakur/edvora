import React, { useState } from 'react'
import { FaSortDown } from 'react-icons/fa'
import Select from 'react-select';
import './Filter.scss';

const Filter = (props) => {
    const [cityActive, setCityActive] = useState(false);
    const [stateActive, setStateActive] = useState(false);

    const data = props?.data;
    const filter = props?.filter;
    const setFilter = props?.setFilter;
    const emptyOption = { label: '--------------', value: '' };

    let cityOptions = [...new Set(data?.rides[props?.category].map(ride => ride.city))];
    cityOptions = cityOptions.map(city => {
        return { label: city, value: city }
    })
    cityOptions.unshift(emptyOption);

    let stateOptions = [...new Set(data?.rides[props?.category].map(ride => ride.state))];
    stateOptions = stateOptions.map(state => {
        return { label: state, value: state }
    })
    stateOptions.unshift(emptyOption);

    return (
        <div className={"desktop__navbar__filter__box "+(!props?.hidden || " hidden")}>
            <div className="desktop__navbar__filter__box__title">Filters</div>
            <div className="desktop__navbar__filter__box__seperator"></div>
            <div className="desktop__navbar__filter__box__state">
                <div className="desktop__navbar__filter__box__state__toggler">
                    <span>State</span> <FaSortDown onClick={() => setStateActive(!stateActive)} />
                </div>
                <Select
                    className={"state__select2" + (stateActive ? "--active" : "--hidden")}
                    options={stateOptions} defaultValue={{ label: filter.state, value: filter.state }}
                    onChange={(selected) => setFilter({ ...filter, state: selected.value })}
                />
            </div>
            <div className="desktop__navbar__filter__box__city">
                <div className="desktop__navbar__filter__box__city__toggler">
                    <span>City</span> <FaSortDown onClick={() => setCityActive(!cityActive)} />
                </div>
                <Select
                    className={"city__select2" + (cityActive ? "--active" : "--hidden")}
                    options={cityOptions} defaultValue={{ label: filter.city, value: filter.city }}
                    onChange={(selected) => setFilter({ ...filter, city: selected.value })}
                />
            </div>
        </div>
    )
}

export default Filter