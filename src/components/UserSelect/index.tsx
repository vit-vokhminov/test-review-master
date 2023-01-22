import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);

    // useEffect должен объявляться перед return, это правило линтинга
    React.useEffect(
        () => {
            console.log('userSelect');
            // fetch запрос стоит закешировать, просто вынеся логику в RTK Query
            // если использовать не Toolkit, есть библиотека useSWR 
            // либо просто записать в redux
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    // UserSelect это явно элемент UI, в нём не должно быть обработчиков, callback и всё
    // всю логику надо описать в MainApp, и передать в виде callback
    // fetch запроса здесь также быть не должно
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        // options.map пропущен ключ
        <select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user: any, index: number) => <option value={user.id} key={index}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;

