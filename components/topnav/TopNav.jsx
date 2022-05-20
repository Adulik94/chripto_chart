import './topnav.scss'

import React from 'react'
import UserInfo from '../user-info/UserInfo'
import { data } from '../../constants'

const TopNav = () => {
    const openSidebar = () => {
        document.body.classList.add('sidebar-open')
    }

    return (
        <div className='topnav'>
            <UserInfo user={data.user} />
            <div className="sidebar-toggle" onClick={openSidebar}>
                <i className='bx bx-menu-alt-right'></i>
            <input  placeholder='Search'/>

            </div>
        </div>
    )
}

export default TopNav
