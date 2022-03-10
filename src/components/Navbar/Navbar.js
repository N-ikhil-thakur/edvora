import React, { useState } from 'react'
import { BsFilterLeft } from 'react-icons/bs';
import {NavLink} from 'react-router-dom';
import Filter from '../Filter/Filter';
// import {applyFilter} from '../../Filter';


import './Navbar.scss';

const Navbar = (props) => {
    const [filterActive, setFilterActive] = useState(false);
    return (
        <div className="desktop__navbar">
            <div className="desktop__navbar__links">
                <div className="desktop__navbar__links__item" onClick={() => props.setCategory('nearest')}>
                    <NavLink to=""> Nearest Rides </NavLink>      
                </div>
                <div className="desktop__navbar__links__item" > 
                    <NavLink to="/upcoming" onClick={() => props.setCategory('upcoming')}> Upcoming Rides ({props?.data?.rides?.upcoming.length}) </NavLink>      
                </div>
                <div className="desktop__navbar__links__item"> 
                    <NavLink to="/past" onClick={() => props.setCategory('past')}> Past Rides ({props?.data?.rides?.past.length}) </NavLink>      
                </div>
            </div>
            <div className="desktop__navbar__filter">
                <span className="desktop__navbar__filter__toggler" onClick={() => setFilterActive(!filterActive)}><BsFilterLeft/> Filters</span>
                <Filter {...props} hidden={!filterActive}/>
            </div>
        </div>
    )
}

export default Navbar