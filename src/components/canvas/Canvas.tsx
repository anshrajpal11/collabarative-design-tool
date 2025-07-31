"use client";

import { useMutation, useStorage } from "@liveblocks/react";
import React, { useCallback, useEffect, useState } from "react";
import { pointerEventToCanvasPoint, rgbToHex } from "~/utils";
import { LayerComponent } from "./LayerComponent";
import {
  type Camera,
  LayerType,
  type Layer,
  type Point,
  type RectangleLayer,
  type EllipseLayer,
  type CanvasState,
  CanvasMode,
} from "~/types";
import { LiveObject } from "@liveblocks/client";
import { nanoid } from "nanoid";
import Toolsbar from "../toolsbar/Toolsbar";

const MAX_LAYERS = 100;

const Canvas = () => {
  const roomColor = useStorage((root) => root.roomColor);
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      let layer: LiveObject<Layer> | null = null;

      console.log("Received layerType:", layerType);
      console.log("LayerType.Rectangle:", LayerType.Rectangle);
      console.log("LayerType.Ellipse:", LayerType.Ellipse);

      if (layerType === LayerType.Rectangle) {
        console.log("It's a rectangle.");
        layer = new LiveObject<RectangleLayer>({
          type: LayerType.Rectangle,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 217, g: 217, b: 217 },
          stroke: { r: 217, g: 217, b: 217 },
          opacity: 100,
        });
      } else if (layerType === LayerType.Ellipse) {
        console.log("It's a ellipse.");
        layer = new LiveObject<EllipseLayer>({
          type: LayerType.Ellipse,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: { r: 217, g: 217, b: 217 },
          stroke: { r: 217, g: 217, b: 217 },
          opacity: 100,
        });
      }

      console.log("Created layer:", layer);

      if (layer) {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
    },
    [],
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
      zoom: camera.zoom,
    }));
  }, []);

  const onPointerDown = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if(canvasState.mode === CanvasMode.Dragging){
        setState({mode:CanvasMode.Dragging,origin:point})
      }

    },[canvasState, setState, insertLayer]);


  const onPointerMove = useMutation(
  ({}, e: React.PointerEvent) => {
    if (canvasState.mode === CanvasMode.Dragging && canvasState.origin) {
      const deltaX = e.movementX;
      const deltaY = e.movementY;

      setCamera((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
        zoom: prev.zoom,
      }));
    }
  },
  [canvasState] // no need to include `camera` or `setCamera` in dependencies if you're using the functional updater
);


 

  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.None) {
        setState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      }
      else if(canvasState.mode===CanvasMode.Dragging){
        setState({mode:CanvasMode.Dragging,origin:null})
      }
    },
    [canvasState, setState, insertLayer],
  );



  return (
    <div className="flex h-screen w-full">
      <main className="fixed right-0 left-0 h-screen overflow-y-auto">
        <div
          style={{
            backgroundColor: roomColor ? rgbToHex(roomColor) : "1e1e1e",
          }}
          className="h-full w-full touch-none"
        >
          <svg
            onWheel={onWheel}
            onPointerUp={onPointerUp}
            className="h-full w-full"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
          >
            <g
              style={{
                transform: `translate(${camera.x}px,${camera.y}px) scale(${camera.zoom})`,
              }}
            >
              {layerIds?.map((layerId) => {
                return <LayerComponent key={layerId} id={layerId} />;
              })}
            </g>
          </svg>
        </div>
      </main>

      <Toolsbar
        canvasState={canvasState}
        setCanvasState={(newState) => setState(newState)}
        zoomIn={() => {
          setCamera((camera) => ({ ...camera, zoom: camera.zoom + 0.1 }));
        }}
        zoomOut={() => {
          setCamera((camera) => ({ ...camera, zoom: camera.zoom - 0.1 }));
        }}
        canZoomIn={camera.zoom < 2}
        canZoomOut={camera.zoom > 0.5}
      />
    </div>
  );
};

export default Canvas;
