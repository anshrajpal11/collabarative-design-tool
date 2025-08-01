import { useStorage } from "@liveblocks/react";

import { memo } from "react";
import { string } from "zod";
import { LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";
import { rgbToHex } from "~/utils";
import Text from "./Text";

export const LayerComponent = memo(({ id }: { id: string }) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  console.log("LayerComponent - layer type:", layer.type);
  console.log("LayerComponent - layer:", layer);

  switch (layer.type) {
    case LayerType.Path:
      return (
        <Path
          points={layer.points}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? rgbToHex(layer.fill) : "#CCC"}
          stroke={layer.stroke ? rgbToHex(layer.stroke) : "#CCC"}
          opacity={layer.opacity}
        />
      );
    case LayerType.Rectangle:
      console.log("Rendering Rectangle component");
      return <Rectangle id={id} layer={layer} />;
    case LayerType.Ellipse:
      console.log("Rendering Ellipse component");
      return <Ellipse id={id} layer={layer} />;
    case LayerType.Text:
      console.log("Rendering Text component");
      return <Text id={id} layer={layer} />;

    default:
      return null;
  }
});

LayerComponent.displayName = "LayerComponent";
