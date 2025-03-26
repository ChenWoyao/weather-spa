import React from 'react';
import WeatherForecast from '@/components/WeatherForecast';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className='App'>
        <WeatherForecast />
      </div>
    </ConfigProvider>
  );
}

export default App;
