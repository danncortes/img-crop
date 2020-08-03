import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import landscape from '../assets/landscape.jpeg';
import Draggable, { DraggableCore } from 'react-draggable';
import './ImageCrop.css'

ImageCrop.propTypes = {

};

type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
type DraggableData = {
  node: HTMLElement,
  // lastX + deltaX === x
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

const canvasWidth = 120
const canvasHeight = 120

function ImageCrop() {

  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [activeDrags, setActiveDrags] = useState(0)

  const imageElement = React.useRef(null)
  const canvasRef = React.useRef(null)

  useEffect(() => {
    // @ts-ignore
    let imageContext = canvasRef.current && canvasRef.current.getContext('2d')
    const { x, y } = deltaPosition
    const imageCroppedWidth = canvasWidth + x
    console.log('ImageCrop -> imageCroppedWidth', imageCroppedWidth)
    const imageCroppedHeight = canvasHeight + y
    console.log('ImageCrop -> imageCroppedHeight', imageCroppedHeight)
    console.log('ImageCrop -> deltaPosition', deltaPosition)

    // @ts-ignore
    imageElement.current && imageContext.drawImage(
      imageElement.current,
      x,
      y,
      imageCroppedWidth,
      imageCroppedHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  })

  const handleDrag = (e, ui: DraggableData) => {
    const { x, y } = deltaPosition;
    const detalX = x + ui.deltaX

    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const onStart = () => {
    setActiveDrags(activeDrags);
  };

  const onStop = () => {
    setActiveDrags(activeDrags);
  };

  const dragHandlers = { onStart, onStop };

  return (
    <div className="image-crop-component">
      <Draggable bounds="parent" onDrag={handleDrag} {...dragHandlers}>
        {/* @ts-ignore */}
        <canvas
          id="canvas"
          width={canvasWidth}
          height={canvasHeight}
          className="image-crop__canvas"
          ref={canvasRef}
        ></canvas>
      </Draggable>

      <div className="image-container">
        {/* @ts-ignore */}
        <img className="image-container__img" src={landscape} alt="" ref={imageElement} />
      </div>
    </div>
  );
}

export default ImageCrop;
