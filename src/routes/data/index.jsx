import React from 'react';
import { Spinner, Table, Alert } from 'react-bootstrap';
import { useCovid19api } from '../../api';

export const Data = () => {
    let [{ data, loading, error }] = useCovid19api('/summary');
    // calculate active cases:
    let { Global: summary, Countries: records } = data ?? {};
    records = records ?? [];
    records = records.map((r) => {
        return {
            ...r,
            Active: r.TotalConfirmed - r.TotalDeaths - r.TotalRecovered,
        };
    });
    if (summary) {
        summary['Active'] =
            summary.TotalConfirmed -
            summary.TotalDeaths -
            summary.TotalRecovered;
    }

    return (
        <div className="h-100 overflow-auto">
            {loading ? (
                <div class="h-100 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : error ? (
                <div class="h-100 d-flex justify-content-center align-items-center">
                    <Alert variant="danger">{error.toString()}</Alert>
                </div>
            ) : (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th className="text-right">Active</th>
                            <th className="text-right">Deaths</th>
                            <th className="text-right">Recovered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((r, i) => {
                            return (
                                <tr key={r.CountryCode}>
                                    <td>{i + 1}</td>
                                    <td>{r.Country}</td>
                                    <td className="text-right">{r.Active}</td>
                                    <td className="text-right">
                                        {r.TotalDeaths}
                                    </td>
                                    <td className="text-right">
                                        {r.TotalRecovered}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    {summary && (
                        <tfoot>
                            <tr class="font-weight-bold">
                                <td>Totals</td>
                                <td>-</td>
                                <td className="text-right">{summary.Active}</td>
                                <td className="text-right">
                                    {summary.TotalDeaths}
                                </td>
                                <td className="text-right">
                                    {summary.TotalRecovered}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </Table>
            )}
        </div>
    );
};
