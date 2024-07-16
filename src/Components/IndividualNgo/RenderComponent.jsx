import React from 'react'
import Description from './Description';
import Projects from './Projects';
import Team from './Team';
import Gallery from './Gallery';
import Community from './Community';
import { Routes } from 'react-router-dom';

function RenderComponent({index, data}) {



    switch (index) {


        case 0: return <Description data={data}/>
            break;
        case 1: return <Projects/>
            break;
        case 2: return <Gallery/>
            break;
        case 3: return <Team/>
            break;
        case 4: return <Community/>
            break;
    
        default:
            break;
    }
}

export default RenderComponent
