import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      // Ensure the TradingView object is available before creating the widget
      if (window.TradingView) {
        new window.TradingView.widget({
          width: '100%',
          height: 600,
          symbol: 'FX:EURUSD',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: 1,
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview-container',
        });
      } else {
        console.error('TradingView library failed to load.');
      }
    };
    script.onerror = () => {
      console.error('Failed to load TradingView library.');
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script element when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>EUR/USD Forex Chart</h1>
        <div id="tradingview-container" style={{ height: '600px', width: '100%' }}></div>
      </header>
    </div>
  );
}

export default App;
