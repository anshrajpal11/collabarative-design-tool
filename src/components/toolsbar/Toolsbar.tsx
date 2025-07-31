import React from "react";
import type { CanvasState } from "~/types";

export default function Toolsbar({
  canvasState,
  setCanvasState,
}: {
  canvasState: CanvasState;
  setCanvasState: ( newState: CanvasState)=>void;
}) {
  return <div className="fixed bottom-4 left-1/2 z-10 flex -translate-z-1/2 items-center justify-center rounded-lg bg-white p-1 shadow-[0_0_3px_rgba(0,0,0,0.18)]">
    
    <div className="flex justify-center items-center gap-3">
      
    </div>


  </div>;
}
