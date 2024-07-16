import React from 'react'
import Description from './Description';
import UserProjects from './UserProjects';
import UserTeam from './UserTeam';
import UserGallery from './UserGallery';
import UserCommunity from './UserCommunity';
import { Route } from 'react-router-dom';

function UserRenderComponent({index, data}) {

    switch (index) {
        case 0: return <Description data={data}/> 
            break;
        case 1: return <UserProjects />
            break;
        case 2: return <UserGallery/>
            break;
        case 3: return <UserTeam/>
            break;
        case 4: return <UserCommunity/>
            break;
    
        default:
            break;
    }
}

export default UserRenderComponent
