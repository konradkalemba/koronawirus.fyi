import React, { useEffect, useRef } from 'react';
import { styled } from 'baseui';
import { useWindowDimensions } from '../utils/hooks';

const StretchCanvas = styled('canvas', {
  width: '100%',
  height: '100%',
  position: "fixed",
  zIndex: -1
});

const easeOutQuad = t => t*(2-t);

// the render logic should be focusing on the rendering 
var drawGrid = function(ctx, w, h, step, progress, xt = 0.5, yt = 0.5) {
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath(); 

  const xTr = (xt-0.5)*20;
  const yTr = (yt-0.5)*20;
  for (var x=0;x<=w;x+=step) {
          ctx.moveTo(x + xTr, yTr);
          ctx.lineTo(x + xTr, yTr + h*easeOutQuad(progress));
  }
  // set the color of the line
  ctx.strokeStyle = 'rgb(0,0,0)';
  ctx.lineWidth = 0.08;
  // the stroke will actually paint the current path 
  ctx.stroke(); 
  // for the sake of the example 2nd path
  ctx.beginPath(); 
  for (var y=0;y<=h;y+=step) {
          ctx.moveTo(xTr, y + yTr);
          ctx.lineTo(xTr + w*easeOutQuad(progress), y + yTr);
  }
  // set the color of the line
  ctx.strokeStyle = 'rgb(0,0,0)';
  // just for fun
  ctx.lineWidth = 0.08;
  // for your original question - you need to stroke only once
  ctx.stroke(); 
  if (progress < 1) {
  window.requestAnimationFrame(drawGrid.bind(null, ctx,w, h, w/10, progress+0.01, 0.5, 0.5));
  }
};

export default function GridBackground() {
  const canvasRef = useRef();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    drawGrid(context,width, height, width/10, -0.2);

    window.addEventListener('mousemove', e => {
      window.requestAnimationFrame(drawGrid.bind(null, context,width, height, width/10, 1, e.x / width, e.y / height));
    });
  }, []);

  return (
    <>
    <StretchCanvas
      ref={canvasRef}
      width={width}
      height={height}
    >

    </StretchCanvas>
    </>
  )
}