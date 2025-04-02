import IMultiDeviceImage from "./multi-image";

export default interface ISectionVerticalRectangularCard {
  type: string;
  text?: string;
  imagesUrls?: IMultiDeviceImage;
  cardItems: Array<{
    text?: string;
    iconUrl?: string;
    linkUrl?: string;
    linkTitle?: string;
    imagesUrls?: IMultiDeviceImage;
  }>;
  buttonLink?: string;
  buttonLinkTitle?: string;
}