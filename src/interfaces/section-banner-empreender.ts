import IMultiDeviceImage from "./multi-image";

export default interface ISectionBannerEmpreender {
  type: string;
  text?: string;
  imagesUrls: IMultiDeviceImage;
  buttonLink?: string;
  buttonLinkTitle?: string;
}