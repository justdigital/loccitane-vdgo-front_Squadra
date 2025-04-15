import IMultiDeviceVideo from "./multi-video";

export default interface ISectionHorizontalVideos {
  type: string;
  title: string;
  subtitle: string;
  text1: string;
  text2: string;
  buttonTitle: string;
  buttonLinkUrl: string;
  cardItems: Array<{
    text?: string;
    videosUrls?: IMultiDeviceVideo;
  }>;
}