import { Provider } from 'react-redux';

import { Theme } from '../../theme';
import { store } from '../../store';

import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Content } from '../content';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Content />} />
    ),
);

export function App() {
    return (
        <Provider store={store}>
                <Theme>
                <RouterProvider router={router} />
                </Theme>
        </Provider>
    );
}


