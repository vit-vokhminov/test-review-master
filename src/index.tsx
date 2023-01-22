import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);


/*
    Сложно что-то сказать по этому проекту, т.к. компоненты переплетены между собой
    и работать с таким проектом становится крайне тяжело. 
    Ни масштабировать, ни поправить.

    Логика, выполняющая не сложные операции, порезана на куски и раскидана по компонентам, получается некий монолит.
    В итоге сложно понять как работает данный код, и править его тяжело, т.к. логика буквально порезана и сообщается
    между собой пропсами и колбеками. 
    Есть одно значение в одном компоненте, работает всё. Нет одного значения в одном компонете, не работает ни чего. 

    Компонент App это по сути входная точка в приложение, и ему не место в components.
    Покласть App в components можно если использовать методологию Feature-Sliced Design (FSD).
    Но FSD это отдельный большой разговор.

    В .gitignore стоит добавить папку .idea
*/