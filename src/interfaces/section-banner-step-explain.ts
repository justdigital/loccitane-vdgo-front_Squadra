import IMultiDeviceImage from "./multi-image";

export default interface ISectionBannerStepExplain {
  id: string,
  type: string,
  imagesUrls: IMultiDeviceImage,
  cardItems: ISectionBannerStepExplainCardItem[],
  text: string
}

export interface ISectionBannerStepExplainCardItem {
    id: string,
    text: string,
    imageUrl: string
}