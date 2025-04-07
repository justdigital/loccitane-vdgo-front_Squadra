import IMultiDeviceImage from "./multi-image";

export default interface ISectionComentarios {
  type: string;
  text?: string;
  cardItems: Array<{
    text?: string;
    qualification?: string;
    textName?: string;
    textDate?: string;
    imagesUrls?: IMultiDeviceImage;
  }>;
}