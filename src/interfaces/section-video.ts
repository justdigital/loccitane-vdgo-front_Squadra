import IMultiDeviceVideo from "./multi-video";

export default interface ISectionLargeVideo {
  type: string;
  text?: string;
  videosUrls: IMultiDeviceVideo;
}