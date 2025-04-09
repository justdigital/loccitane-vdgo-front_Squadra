import IMultiDeviceImage from "./multi-image";
import IMultiDeviceVideo from "./multi-video";

export default interface ISectionHorizontalCards {
  type: string;
  title: string;
  subtitle: string;
  cardItems: Array<{
    cardTypeImage: boolean;
    text?: string;
    linkUrl?: string;
    linkTitle?: string;
    imagesUrls?: IMultiDeviceImage;
    videosUrl?: IMultiDeviceVideo;
    iconUrl?: string;
  }>;
}