import IMultiDeviceImage from "./multi-image";

export default interface ISectionHorizontalCards {
  type: string;
  title: string;
  subtitle: string;
  cardItems: Array<{
    text?: string;
    linkUrl?: string;
    linkTitle?: string;
    imagesUrls?: IMultiDeviceImage;
    videoUrl?: string;
    iconeUrl?: string;
  }>;
}