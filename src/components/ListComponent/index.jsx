import React, { useEffect, useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { BsCheck } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';

import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import store from '../../firebase/firebase.config';

const List = () => {
  const [list, setList] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    setList(list);
  }, [list]);

  const handleDrag = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;
    setList(list => reorder(list, source.index, destination.index));
  };

  const reorder = (list, sourceIndex, destinationIndex) => {
    const result = [...list];
    const [removed] = result.splice(sourceIndex, 1);
    return result;
  };

  const updateCompleted = async (e) => {
    const taskRef = doc(store, 'tasks', e.target.id);
    await updateDoc(taskRef, {completed: e.target.checked});
  };

  const deleteTask = (id) => {
    deleteDoc(doc(store, 'tasks', id));
  };

  return (
    <div>List</div>
  )
}

export default List