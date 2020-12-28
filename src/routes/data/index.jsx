import React from 'react';
import { Table } from 'react-bootstrap';

export const Data = ({ data = {} }) => {
    // calculate active cases:
    let { Global: summary, Countries: records } = data;
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
        <div className="h-100 overflow-auto p-relative">
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
                                <td className="text-right">{r.TotalDeaths}</td>
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
        </div>
    );
};
