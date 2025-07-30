import React from 'react'
import type { RectangleLayer } from '~/types'
import { rgbToHex } from '~/utils';

const Rectangle = ({id,layer}:{id:string,layer:RectangleLayer}) => {
  const {x,y,width,height,fill,stroke,opacity,cornerRadius}=layer;
  return (
    <g>
      <rect style={{transform:`translate(${x}px,${y}px)`}} x={x} y={y} width={width} height={height} fill={fill?rgbToHex(fill):"CCC"} strokeWidth={1} stroke={stroke?rgbToHex(stroke):"CCC"} />
    </g>
  )
}

export default Rectangle
