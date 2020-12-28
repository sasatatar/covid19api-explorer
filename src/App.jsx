import React from 'react';
import { Nav } from 'react-bootstrap';
import {
    Link,
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import './App.css';
import { BarChart } from './routes/bar-chart';
import { Data } from './routes/data';
import { useState } from 'react';

const SORT_BY = {
    Active: 'Active',
    TotalConfirmed: 'TotalConfirmed',
    TotalDeaths: 'TotalDeaths',
    TotalRecovered: 'TotalRecovered',
};

function App() {
    let location = useLocation();
    let { pathname } = location;

    let history = useHistory();
    function handleOnSelect(val) {
        history.push(val);
    }

    let [sortBy, setSortBy] = useState(SORT_BY.Active);
    let [filter, setFilter] = useState();

    return (
        <div className="py-4 h-100">
            <div className="col-md-6 d-flex flex-column h-100 offset-md-3">
                <div className="d-flex flex-column align-items-center">
                    <h3 className="text-info">Covid19 API Explorer</h3>
                    <header className="mb-2">
                        <Nav
                            variant="pills"
                            activeKey={pathname}
                            onSelect={handleOnSelect}
                        >
                            <Nav.Item>
                                <Nav.Link eventKey="/data">Data</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="/chart">
                                    Bar charts
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </header>
                </div>
                <div className="d-flex mb-2">
                    <label className="mr-1 mb-0">Filter</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            let value = e.target.value;
                            setFilter(value);
                        }}
                    ></input>
                    <div style={{ flex: 1 }} />
                    <label className="mr-1 mb-0">Sort by</label>
                    <select
                        onChange={(e) => {
                            let value = e.target.value;
                            setSortBy(value);
                        }}
                        value={sortBy}
                        // className="text-sm rounded-sm border"
                    >
                        <option value={SORT_BY.Active}>Active</option>
                        <option value={SORT_BY.TotalConfirmed}>
                            Confirmed
                        </option>
                        <option value={SORT_BY.TotalDeaths}>Deaths</option>
                        <option value={SORT_BY.TotalRecovered}>
                            Recovered
                        </option>
                    </select>
                </div>
                <Switch>
                    <Route path="/data">
                        <Data sortBy={sortBy} filter={filter} />
                    </Route>
                    <Route path="/chart">
                        <BarChart sortBy={sortBy} filter={filter} />
                    </Route>
                    <Route path="/" exact>
                        <Redirect to="/data" />
                    </Route>
                    <div>
                        <h2>Page not found</h2>
                        <div>
                            Go back to <Link to="/data">Data</Link>.
                        </div>
                    </div>
                </Switch>
            </div>
        </div>
    );
}

export default App;
