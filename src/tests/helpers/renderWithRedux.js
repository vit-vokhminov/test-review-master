
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';

export const renderWithRedux = (component) => {
    return render(
        <Provider store={store}>
            {component}
        </Provider>
    );
}


