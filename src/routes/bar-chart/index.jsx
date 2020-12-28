import React from 'react';
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { Animation } from '@devexpress/dx-react-chart';
import { useCovid19api } from '../../api';
import { Alert, Spinner } from 'react-bootstrap';
import { useState } from 'react';

const SORT_BY = {
    Active: 'Active',
    TotalConfirmed: 'TotalConfirmed',
    TotalDeaths: 'TotalDeaths',
    TotalRecovered: 'TotalRecovered',
};

export const BarChart = ({ sortBy, filter }) => {
    let [{ data, loading, error }] = useCovid19api('/summary');
    // calculate active cases:
    let { Global: summary, Countries: records } = data ?? {};
    records = records ?? [];
    records = records
        .map((r) => {
            return {
                ...r,
                Active: r.TotalConfirmed - r.TotalDeaths - r.TotalRecovered,
            };
        })
        .filter((r) => {
            if (!filter) return true;
            return r.Country.toLowerCase().includes(filter.toLowerCase());
        })
        .sort((a, b) => {
            return a[sortBy] >= b[sortBy] ? -1 : 1;
        })
        .slice(0, 10);

    return (
        <>
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
                    <div className="card">
                        <Chart data={records}>
                            <ArgumentAxis />
                            <ValueAxis />

                            <BarSeries
                                valueField={sortBy}
                                argumentField="Country"
                            />
                            {/* <Title text="World population" /> */}
                            <Animation />
                        </Chart>
                    </div>
                )}
            </div>
        </>
    );
};
