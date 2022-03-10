import React from 'react'
// import ProfilePic from '../../assets/profile_pic.jpg';

import './Desktop.scss'
import Navbar from '../../components/Navbar/Navbar';
import Ride from '../../components/Ride/Ride';

const Desktop = ({...props}) => {
    const data = props?.data;
    return (
        <div className="desktop">
            <div className="desktop__header">
                <div className="desktop__header__company">Edvora</div>
                <div className="desktop__header__profile">
                    <div className="desktop__header__profile__name">{data?.user?.name}</div>
                    <div className="desktop__header__profile__picture">
                        <img src={data?.user?.url} alt="bitmoji" />
                    </div>
                </div>            
            </div>
            < Navbar {...props} />
            <div className="desktop__body">
                {data?.rides[props?.category].map( ride => <Ride data={ride}/>)}
            </div>

        </div>
    )
}

export default Desktop