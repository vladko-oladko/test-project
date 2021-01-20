import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import { fetchCurrenciesDataAction } from '../../store/currencies/sagas';
import {
  selectCurrenciesData,
  selectCurrenciesTime,
  selectCurrenciesLoading,
  selectError,
} from '../../store/currencies/selectors';
import styles from './index.module.css';

const Currency: React.FC = () => {
  const dispatch = useDispatch();

  const currenciesData = useSelector(selectCurrenciesData);
  const currenciesTime = useSelector(selectCurrenciesTime);
  const error = useSelector(selectError);
  const loading = useSelector(selectCurrenciesLoading);

  const [sortedCurrenciesData, setSortedCurrenciesData] = useState(currenciesData);
  const [sorting, setSorting] = useState<'code' | 'rate_float'>('code');

  useEffect(() => {
    const sortedData = [...currenciesData].sort((a, b) => {
      if (a[sorting] < b[sorting]) { return -1; }
      if (a[sorting] > b[sorting]) { return 1; }
      return 0;
    });

    setSortedCurrenciesData(sortedData);
  }, [currenciesData, sorting]);

  useEffect(() => {
    dispatch(fetchCurrenciesDataAction());

    const interval = setInterval(() => {
      dispatch(fetchCurrenciesDataAction());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const renderCurrenciesData = () => {
    if (sortedCurrenciesData) {
      return sortedCurrenciesData.map((item) => (
        <tr key={item.code}>
          <td>{item.code}</td>
          <td>{item.description}</td>
          <td>{item.rate}</td>
        </tr>
      ));
    }
    return null;
  };

  if (error) {
    return (
      <div>{error}</div>
    );
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSorting('code')} className={styles.pointer}>
              Currency
              {' '}
              {sorting === 'code' && '↓'}
            </th>
            <th>Description</th>
            <th onClick={() => setSorting('rate_float')} className={styles.pointer}>
              Rate
              {' '}
              {sorting === 'rate_float' && '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {renderCurrenciesData()}
        </tbody>
      </table>
      <div style={{ alignSelf: 'flex-start' }}>
        Last update:
        {' '}
        {currenciesTime}
      </div>
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={60}
        width={60}
        className={styles.loading}
        visible={loading}
      />
    </div>
  );
};

export default Currency;
