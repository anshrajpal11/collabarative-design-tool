"use client"

import { useStorage } from '@liveblocks/react'
import React from 'react'
import { rgbToHex } from '~/utils';
import { LayerComponent } from './LayerComponent';

const Canvas = () => {

  const roomColor = useStorage((root)=>root.roomColor);
  const layerIds = useStorage((root)=>root.layerIds);

  return (
    <div className='flex h-screen w-full'>
      <main className='fixed left-0 right-0 h-screen overflow-y-auto'>

        <div style={{backgroundColor:roomColor? rgbToHex(roomColor) :"1e1e1e" }} className='h-full w-full touch-none' >

          <svg className='w-full h-full'> 
            
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
