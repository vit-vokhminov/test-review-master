import React from 'react';
import logo from '../../logo.svg';
// глобально стоит подключать только стили общего оформления
// в остальных случаях лучше использовать модули, это уменьшит итоговый бандл
import './App.css';
import MainApp from '../MainApp';
import { useSelector } from 'react-redux';

function App() {
    // todos это список задач, правильней будет их получать внутри MainApp
    // сейчас изменение в todos приводит к ререндеру всего приложения
    const todos = useSelector(
        // в redux стоит описать selectors, чтобы в самом компоненте получать конкретное значение
        (state: { list: { todos: any[] } }) => state.list.todos
    );

    return (
        // todo list for users:
        <div className='App main'>
            {/* компоненты header, footer достойны отдельного компонента*/}
            <header className='App-header'>
                TODO list with users:
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
            </header>
            {/* MAIN APP: */}
            <MainApp todos={todos} />

            <footer className='App-footer'>
                {/* внешняя сслыка, тег <а> - ок */}
                <a
                    href='https://example.org'
                    target='_blank'
                    className={'App-footer-link'}
                >
                    All right reserved
                </a>
            </footer>
        </div>
    );
}

export default App;
