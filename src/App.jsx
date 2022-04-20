import React, { useState, useEffect } from "react";

import "./index.scss";

// Firestore
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import store from "./firebase/firebase.config";

// Components
import Add from "./components/AddComponent";
import List from "./components/ListComponent";
import Config from "./components/ConfigComponent";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Msg from "./components/MsgComponent";
import Timer from './components/TimerComponent';

// Images
import HeaderDarkMobile from "./assets/img/bg-mobile-dark.jpg";
import HeaderDarkDesktop from "./assets/img/bg-desktop-dark.jpg";
import HeaderLightMobile from "./assets/img/bg-mobile-light.jpg";
import HeaderLightDesktop from "./assets/img/bg-desktop-light.jpg";

// Icons
import { BiLoader, BiLoaderAlt } from "react-icons/bi";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksAll, setTasksAll] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [id, setId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [Reset, setReset] = useState(false);
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
      console.log("console", temp);
    });
  }, []);

  const setCompleted = (newId) => setId(newId);
  const changeTheme = (newTheme) => setTheme(newTheme);
  const getAllTasks = () => (setTasks(tasksAll), setCurrentFilter("all"));
  const getActiveTasks = (activeTasks) => (
    setTasks(activeTasks), setCurrentFilter("active")
  );
  const getCompletedTasks = (completedTasks) => (
    setTasks(completedTasks), setCurrentFilter("completed")
  );
  const reset = (isReset) => setReset(isReset);

  return (
    <>
    <img src={HeaderDarkDesktop} className="img-dark-desktop" alt="Desktop header" />
    <img src={HeaderDarkMobile} className="img-dark-mobile" alt="Mobile header" />
    <img src={HeaderLightDesktop} className="img-light-desktop" alt="Mobile header" />
    <img src={HeaderLightMobile} className="img-light-mobile" alt="Mobile header" />
      <div className={"content " + theme}>
        <Header changeTheme={changeTheme} />
        <Timer />
        <Add countTask={tasks.length} setReset={reset} reset={Reset} />
        {loading ? (
          <div className="loading">
            <h2>Loading...</h2>
            <BiLoaderAlt className="icon-loading" />
          </div>
        ) : null}
        <Msg tasks={tasks} filter={currentFilter} loading={loading} />
        <List list={tasks} />
        <Config
          numTasks={tasks.length}
          completed={id}
          staticTasks={tasksAll}
          getAll={getAllTasks}
          getActive={getActiveTasks}
          getCompleted={getCompletedTasks}
          reset={Reset}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
