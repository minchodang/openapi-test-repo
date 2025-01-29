import { useState } from 'react';
import './App.css';
import { $api } from './__generated__/request';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
    const [count, setCount] = useState(0);
    const { hasNextPage, fetchNextPage } = $api.useInfiniteQuery(
        'get',
        '/clubs',
        {
            params: {
                query: {
                    limit: 5,
                },
            },
        },
        {
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.pagination.has_next_page) {
                    return allPages.length + 1;
                } else {
                    return null;
                }
            },
            pageParamName: 'page',
        }
    );

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <button
                onClick={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
            >
                more fetch
            </button>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
