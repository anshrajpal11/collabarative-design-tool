"use client"

import { useMutation, useStorage } from '@liveblocks/react'
import React, { useEffect, useState } from 'react'
import { pointerEventToCanvasPoint, rgbToHex } from '~/utils';
import { LayerComponent } from './LayerComponent';
import { type Camera, LayerType, type Layer, type Point, type RectangleLayer, type EllipseLayer } from '~/types';
import { LiveObject } from '@liveblocks/client';
import { nanoid } from "nanoid";

const MAX_LAYERS=100;

const Canvas = () => {

  const roomColor = useStorage((root)=>root.roomColor);
  const layerIds = useStorage((root)=>root.layerIds);
  const [camera,setCamera] = useState<Camera>({x:0,y:0,zoom:1})

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text,
      position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if(liveLayers.size>=MAX_LAYERS){
          return;
        }
        
        const liveLayerIds = storage.get("layerIds");
        const layerId=nanoid();
        let layer:LiveObject<Layer> | null=null;

        if(layerType === LayerType.Rectangle){
          console.log("It's a rectangle.");
          layer = new LiveObject<RectangleLayer>({
            type:LayerType.Rectangle,
            x:position.x,
            y:position.y,
            height:100,
            width:100,
            fill:{r:217,g:217,b:217},
            stroke:{r:217,g:217,b:217},
            opacity:100,
          })
        }

        else if(layerType === LayerType.Ellipse){
          console.log("It's a ellipse.");
          layer= new LiveObject<EllipseLayer>({
            type:LayerType.Ellipse,
            x:position.x,
            y:position.y,
            height:100,
            width:100,
            fill:{r:100,g:150,b:217}, 
            stroke:{r:217,g:217,b:217},
            opacity:100,
          })
        }

        if(layer){
          liveLayerIds.push(layerId);
          liveLayers.set(layerId,layer);
          setMyPresence({selection:[layerId]},{addToHistory:true});
        }

    },
    []
  );
  
  

  const onPointerUp = useMutation(({},e:React.PointerEvent)=>{
    const point = pointerEventToCanvasPoint(e,camera);
    insertLayer(LayerType.Ellipse,point);
  },[])
  


  return (
    <div className='flex h-screen w-full'>
      <main className='fixed left-0 right-0 h-screen overflow-y-auto'>

        <div style={{backgroundColor:roomColor? rgbToHex(roomColor) :"1e1e1e" }} className='h-full w-full touch-none' >

          <svg onPointerUp={onPointerUp} className='w-full h-full'> 
            
                <g>
                  {layerIds?.map((layerId)=>{
                    return <LayerComponent key={layerId} id={layerId}/>
                  })}
                </g>

          </svg>

        </div>  
        

      </main>
    </div>
  )
}

export default Canvas



