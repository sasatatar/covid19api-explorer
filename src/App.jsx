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
import { Data } from './routes/data';

const Chart = () => <h2>Chart</h2>;

function App() {
    let location = useLocation();
    let { pathname } = location;

    let history = useHistory();
    function handleOnSelect(val) {
        history.push(val);
    }

    return (
        <div className="py-4 h-100">
            <div className="col-md-6 d-flex flex-column h-100 offset-md-3">
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
                            <Nav.Link eventKey="/chart">Chart</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </header>
                <Switch>
                    <Route path="/data">
                        <Data />
                    </Route>
                    <Route path="/chart">
                        <Chart />
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
