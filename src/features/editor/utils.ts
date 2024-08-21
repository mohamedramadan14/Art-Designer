import { RGBColor } from "react-color";
import { fabric } from "fabric";

export const isTextType = (type: string | undefined) => {
  return type === "text" || type === "i-text" || type === "textbox";
};

export const rgbaToString = (rgba: RGBColor | "transparent") => {
  if (rgba === "transparent") return `rgba(0,0,0,0)`;
  const alpha = rgba.a === undefined ? 1 : rgba.a;
  return `rgba(${rgba.r},${rgba.g},${rgba.b},${alpha})`;
};

export const createFilter = (value: string) => {
  let affect;
  switch (value) {
    case "polaroid":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Polaroid();
      break;

    case "sepia":
      affect = new fabric.Image.filters.Sepia();
      break;

    case "kodachrome":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Kodachrome();
      break;

    case "contrast":
      affect = new fabric.Image.filters.Contrast({ contrast: 0.25 });
      break;

    case "brightness":
      affect = new fabric.Image.filters.Brightness({ brightness: 0.7 });
      break;

    case "brownie":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Brownie();
      break;

    case "vintage":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Vintage();
      break;

    case "technicolor":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Technicolor();
      break;

    case "pixelate":
      affect = new fabric.Image.filters.Pixelate();
      break;

    case "invert":
      affect = new fabric.Image.filters.Invert();
      break;

    case "grayscale":
      affect = new fabric.Image.filters.Grayscale();
      break;

    case "blur":
      affect = new fabric.Image.filters.Blur({
        blur: 0.5,
      });
      break;

    case "sharpen":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;

    case "emboss":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;

    case "removecolor":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;

    case "blacknwhite":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.BlackWhite();
      break;

    case "vibrance":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Vibrance({ vibrance: 0.8 });
      break;

    case "blendcolor":
      affect = new fabric.Image.filters.BlendColor({
        color: "#D3D3D3",
        mode: "multiply",
      });
      break;

    case "huerotate":
      affect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;

    case "resize":
      affect = new fabric.Image.filters.Resize(/* { 
        scaleX: 0.5,
        scaleY: 0.5
       } */);
      break;

    case "gamma":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.2],
      });
    
    case "saturation":
      // @ts-ignore
      // This is because types of fabric.Image.filters not maintained correctly
      affect = new fabric.Image.filters.Saturation({
        saturation: 0.5,
      })  
      break;

    default:
      affect = null;
      return;
  }

  return affect;
};
