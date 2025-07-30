import type { Color } from "./types";

export function rgbToHex(color:Color){
  const { r, g, b } = color;
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}