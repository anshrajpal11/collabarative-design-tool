import { useStorage } from "@liveblocks/react";

import { memo } from "react";
import { string } from "zod";
import { LayerType } from "~/types";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";

export const LayerComponent = memo(({ id }: { id: string }) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  console.log("LayerComponent - layer type:", layer.type);
  console.log("LayerComponent - layer:", layer);

  switch (layer.type) {
    case LayerType.Rectangle:
      console.log("Rendering Rectangle component");
      return <Rectangle id={id} layer={layer} />;
    case LayerType.Ellipse:
      console.log("Rendering Ellipse component");
      return <Ellipse id={id} layer={layer} />;

    default:
      console.log("Unknown layer type:", layer.type);
      return null;
  }
});

LayerComponent.displayName = "LayerComponent";
