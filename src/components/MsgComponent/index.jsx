import React from 'react';

import { BsInfoCircle } from 'react-icons/bs';

const Msg = ({tasks, filter, loading}) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (loading) return
    if (tasks.length > 0) {
      setMessage(null);
      return;
    }
    if (tasks.length <= 0 && filter === 'all') {
      setMessage({
        title: 'No items found',
        text: "You haven't added any task. Add one!"
      })
    }
    if (tasks.length <= 0 && filter === 'active') {
      setMessage({
        title: 'No active tasks found',
        text: "Great! You don't have active tasks"
      })
    }
    if (tasks.length <= 0 && filter === 'completed') {
      setMessage({
        title: 'No completed tasks found',
        text: "So bad... You need to get back to work!"
      })
    }
  }, [tasks]);

  return (
    <div>Msg</div>
  )
}

export default Msg