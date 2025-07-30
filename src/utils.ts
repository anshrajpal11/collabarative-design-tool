import type { Camera, Color, Point } from "./types";

export function rgbToHex(color:Color){
  const { r, g, b } = color;
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const pointerEventToCanvasPoint = (e:React.PointerEvent,camera:Camera):Point=>{
  return {x:Math.round(e.clientX)-camera.x,y:Math.round(e.clientY)-camera.y}
}