import IMultiDeviceImage from "./multi-image";

export interface ISectionBannerOrderExplain {
  id: string,
  type: string,
  text: string,
  textDescription: string,
  link_url: string,
  link_title: string,
  imagesUrls: IMultiDeviceImage,
}