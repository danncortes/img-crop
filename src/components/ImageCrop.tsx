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

function ImageCrop() {

  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const [activeDrags, setActiveDrags] = useState(0)

  const handleDrag = (e, ui: DraggableData) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const onStart = () => {
    setActiveDrags({ activeDrags });
  };

  const onStop = () => {
    setActiveDrags({ activeDrags });
  };

  const dragHandlers = { onStart, onStop };

  return (
    <div className="image-crop-component">
      {/* @ts-ignore */}
      <Draggable>
        <div className="box">
          <div>I track my deltas</div>
          <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
        </div>
      </Draggable>

      <div className="image-container">
        <img className="image-container__img" src={landscape} alt="" />
      </div>
    </div>
  );
}

export default ImageCrop;
