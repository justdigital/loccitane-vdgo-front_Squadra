import IMultiDeviceImage from "./multi-image";

export default interface ISectionTestimonials {
  type: string;
  text?: string;
  cardItems: Array<{
    text?: string;
    qualification?: string;
    textName?: string;
    textDate?: string;
    imagesUrls?: IMultiDeviceImage;
  }>;
}