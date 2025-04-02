import IMultiDeviceImage from "./multi-image";

export default interface ISectionVerticalRectangularCard {
  type: string;
  text?: string;
  imagesUrls?: IMultiDeviceImage;
  cardItems: Array<{
    text?: string;
    iconeUrl?: string;
    linkUrl?: string;
    linkTitle?: string;
    imagesUrls?: IMultiDeviceImage;
  }>;
  ButtonLink?: string;
  ButtonLinkTitle?: string;
}