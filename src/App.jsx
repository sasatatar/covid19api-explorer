import React, { useEffect, useState } from 'react';
import { Col, Nav, Table } from 'react-bootstrap';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from 'react-router-dom';
import './App.css';

const Chart = () => <h2>Chart</h2>;

const Data = () => (
    <>
        <h2>Data</h2>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    </>
);

function App() {
    let location = useLocation();
    let { pathname } = location;
    let [activeKey, setActiveKey] = useState('/data');
    useEffect(() => {
        setActiveKey(pathname);
    }, [pathname]);

    let history = useHistory();
    function handleOnSelect(val) {
        history.push(val);
    }

    return (
        <div class="my-4">
            <Col md={{ span: 6, offset: 3 }}>
                <header class="mb-2">
                    <Nav
                        variant="pills"
                        defaultActiveKey={activeKey}
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
                    <Redirect to="/data" />
                </Switch>
            </Col>
        </div>
    );
}

export default App;
