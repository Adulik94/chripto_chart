import './user-info.scss'

import React from 'react'

const UserInfo = ({ user }) => {
    return (
        <div className='user-info'>
            <div className="user-info__name">
                <span>{user.name}</span>
            </div>
        </div>
    )
}

export default UserInfo
