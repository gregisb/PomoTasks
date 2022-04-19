import React, { useState, useEffect } from 'react';

import './index.scss';

// Firestore
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import store from './firebase/firebase.config';

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
    const [tasks, setTasks] = useState([]);
    const [tasksAll, setTasksAll] = useState([]);
    const [theme, setTheme] = useState('dark');
    const [id, setId] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("all");
    const [reset, setReset] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onSnapshot(collection(store, "tasks"), (snapshot) => {
            let temp = [];
            snapshot.docs.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setLoading(false);
            setTasks(temp);
            setTasksAll(temp);

            const completed = temp.filter((task) => task.completed);
            let arrCompleted = [];
            completed.forEach((item) => {
                arrCompleted.push(item.id);
            });
            setCompleted(arrCompleted);
            console.log('console', temp)
        });
    }, []);

    const setCompleted = (newId) => console.log(newId);
    


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