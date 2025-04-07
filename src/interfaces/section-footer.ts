import IMultiDeviceImage from "./multi-image";

export default interface ISectionFooter {
  type: string;
  textDescription?: string;
  imagesUrls?: IMultiDeviceImage;
  cardItems: Array<{
    text?: string;
    linkTitle?: string;
    imagesUrls?: IMultiDeviceImage;
  }>;
  buttonLink?: string;
  buttonLinkTitle?: string;
}