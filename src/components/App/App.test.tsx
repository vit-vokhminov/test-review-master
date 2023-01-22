import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { Provider } from 'react-redux';
import store from '../../store';


// для тестирования компонентов использующих redux, нужен Provider
// по хорошему лучше сделать хелпер для таких случаев
test('renders learn react link', () => {

    renderWithRedux(<App />);
    const linkElement = screen.getByText(/All right reserved/i);
    expect(linkElement).toBeInTheDocument();


    // const { getByText } = render(
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    // );
    // const txt = getByText(/All right reserved/i);
    // expect(txt).toBeInTheDocument();



    // render(<App />);
    // const linkElement = screen.getByText(/All right reserved/i);
    // expect(linkElement).toBeInTheDocument();
});
