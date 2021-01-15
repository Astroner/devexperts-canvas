import React, { useEffect, useRef } from 'react';
import './App.css';
import { Container } from './lib/Container';
import { Renderer } from './lib/Renderer';
import { Line } from './Line';
import { Trend } from './Trend';
import { useGraphics } from './useGraphics';

function App() {

  const ref = useRef<any>(null);

  const { drawings } = useGraphics();

  useEffect(() => {
    if(!ref.current || !drawings) return
    const r = new Renderer(ref.current);
    const c = new Container();

    for(const drawing of drawings) {
      c.addChild(drawing)
    }

    const stop = r.render(c)

    return stop

  }, [drawings])

  return (
    <div className="App">
      <canvas 
        ref={ref}
        width={600}
        height={600}
      />
    </div>
  );
}

export default App;
