import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import Toolbar from './components/Toolbar';
import NotFound from './pages/NotFound';
import Channel from './pages/Channel';
import Search from './pages/Search';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    }, {
        path: "/channel/*",
        element: <Channel />
    }, {
        path: "/search",
        element: <Search />
    }, {
        path: "*",
        element: <NotFound />
    }
])

function App() {
    return (
        <div className="App">
            <header>
                <Toolbar />
            </header>
            <Main>
                <RouterProvider router={router} />
            </Main>
            <footer>
                <FontLicenseSpan>이 페이지에는 네이버에서 제공한 나눔글꼴이 적용되어 있습니다.</FontLicenseSpan>
            </footer>
        </div>
    );
}

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - 64px - 20px);
    overflow: auto;
`
const FontLicenseSpan = styled.span`
    color: gray;
`

export default App;
