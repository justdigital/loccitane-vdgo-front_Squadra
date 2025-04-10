import IMultiDeviceImage from "./multi-image";

export default interface ISectionBannerOrderExplain {
  id: string,
  type: string,
  text: string,
  textDescription: string,
  linkUrl: string,
  linkTitle: string,
  imagesUrls: IMultiDeviceImage,
}