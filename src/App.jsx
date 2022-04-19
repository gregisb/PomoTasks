import React from 'react';

import './index.scss';

// Components
import Add from './components/AddComponent';
import List from './components/ListComponent';
import Config from './components/ConfigComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Msg from './components/MsgComponent';

// Images
import HeaderDarkMobile from './assets/img/bg-mobile-dark.jpg';
import HeaderDarkDesktop from './assets/img/bg-desktop-dark.jpg';
import HeaderLightMobile from './assets/img/bg-mobile-light.jpg';
import HeaderLightDesktop from './assets/img/bg-desktop-light.jpg';

// Icons
import {BiLoader} from 'react-icons/bi';

const App = () => {
    return (
        <>
        <div className="content">
            <Header />
            <Add />
            <Msg />
            <List />
            <Config />
            <Footer />
        </div>
        </>
    )
};

export default App;