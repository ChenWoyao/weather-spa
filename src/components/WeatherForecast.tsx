'use client';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { AutoComplete, Card, Alert, Row, Col, Table } from 'antd';
import { Line } from '@ant-design/plots';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import { getWeatherForecast } from '@/services/weatherService';

interface WeatherData {
  date: string;
  temperature: number;
  low: string;
  high: string;
  text_day: string;
  text_night: string;
  [prop: string]: any;
}

const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState<string>('上海');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [errMsg, setErrMsg] = useState('');

  const fetchData = (cityName: string) => {
    getWeatherForecast(cityName)
      .then((data) => {
        const { results = [] } = data || {};
        const processedData = results[0].daily;
        setErrMsg('');
        setWeatherData(processedData);
      })
      .catch((error) => {
        setErrMsg(error?.message || '获取天气预报失败');
        setWeatherData([]);
      });
  };

  const debounceFetchData = useCallback(debounce(fetchData, 800), []);

  const formatDate = useMemo(() => {
    const result = weatherData.flatMap((item: WeatherData) => [
      {
        date: dayjs(item.date).format('MM-DD'),
        temperature: parseInt(item.high),
        type: '最高温度',
        text_day: item.text_day,
        text_night: item.text_night,
      },
      {
        date: dayjs(item.date).format('MM-DD'),
        temperature: parseInt(item.low),
        type: '最低温度',
        text_day: item.text_day,
        text_night: item.text_night,
      },
    ]);
    return result;
  }, [weatherData]);

  useEffect(() => {
    debounceFetchData(city);
  }, [city, debounceFetchData]);

  // 配置折线图
  const config = {
    data: formatDate,
    xField: 'date',
    yField: 'temperature',
    seriesField: 'type',
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
    axis: {
      x: {
        title: '日期',
      },
      y: {
        title: '温度 (°C)',
      },
    },
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fillOpacity: 1,
      },
    },
  };

  return (
    <Card title='城市天气预报' style={{ width: '80%', margin: '20px auto' }}>
      <Row align='top' style={{ marginBottom: 10 }}>
        <Col span={4}>
          <label>请输入查询的城市名称：</label>
        </Col>
        <Col span={20}>
          <AutoComplete
            style={{ width: '100%', marginBottom: '20px' }}
            placeholder='请输入城市名称'
            value={city}
            onChange={(value) => {
              setCity(value);
            }}
          />
        </Col>
      </Row>

      {errMsg && <Alert message={errMsg} type='info' />}
      <Line {...config} />

      <Table
        dataSource={weatherData}
        columns={[
          {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: '最高温度',
            dataIndex: 'high',
            key: 'high',
          },
          {
            title: '最低温度',
            dataIndex: 'low',
            key: 'low',
          },
          {
            title: '白天描述',
            dataIndex: 'text_day',
            key: 'text_day',
          },
          {
            title: '夜间描述',
            dataIndex: 'text_night',
            key: 'text_night',
          },
        ]}
        rowKey='date'
        pagination={false}
      />
    </Card>
  );
};

export default WeatherForecast;
