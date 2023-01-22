import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

type Todo = {
    title: string;
    user?: number;
    isDone: boolean;
};

type MainAppProps = {
    todos: Todo[];
    addTodo: (t: Todo) => void;
    changeTodo: (todos: Todo[]) => void;
};
type MainAppState = {
    todoTitle: string;
};

class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' };
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle });
    };

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo);
    };

    render() {
        const { todoTitle } = this.state;
        window.allTodosIsDone = true;

        // если нужно не остслеживаемое значение, для этого есть Ref current 
        // и менять в checkbox по onChange или добавить slice в redux и там же его изменять
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false;
            } else {
                window.allTodosIsDone = true;
            }
        });

        return (
            <div>
                <Form.Check
                    type='checkbox'
                    label='all todos is done!'
                    checked={window.allTodosIsDone}
                    readOnly 
                />
                <hr />
                <InputNewTodo
                    todoTitle={todoTitle}
                    onChange={this.handleTodoTitle}
                    // зачем вешать сабмит на input? Для этого есть тег Form
                    // в будушем возникнут проблемы с доработкой функционала компонента
                    onSubmit={this.handleSubmitTodo}
                /> 
                {this.props.todos.map((t, idx) => (
                    /*не информативная запись ключа и значения*/
                    /*при взгляде на t, первая мысль что это i18next, idx - в чём проблема добавит две буквы*/
                    /*пропущен key={idx}*/
                    <div className={styles.todo} key={idx}>
                        {t.title}
                        <UserSelect user={t.user} idx={idx} />
                        <Form.Check
                            // если у компонента есть свои стили, зачем их хардкодить?
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type='checkbox'
                            checked={t.isDone}
                            onChange={e => {
                                // любые обработчики в jsx затрудняет чтение и понимание компонента
                                // обработчики следует либо вынести в отдельную функцию или описать в самом action
                                const changedTodos = this.props.todos.map(
                                    (t, index) => {
                                        const res = { ...t };
                                        if (index == idx) {
                                            res.isDone = !t.isDone;
                                        }
                                        return res;
                                    }
                                );
                                this.props.changeTodo(changedTodos);
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

// здесь лучше декомпозировать, методы описать в redux actions, и импортировать в компонент,
// описать их в mapStateToProps и mapDispatchToProps и передать в connect
export default connect(
    state => ({}),
    dispatch => ({
        addTodo: (todo: any) => {
            dispatch({ type: 'ADD_TODO', payload: todo });
        },
        changeTodo: (todos: any) =>
            dispatch({ type: 'CHANGE_TODOS', payload: todos }),
        removeTodo: (index: number) =>
            dispatch({ type: 'REMOVE_TODOS', payload: index }),
    })
)(Index);
