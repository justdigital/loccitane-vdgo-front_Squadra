import IMultiDeviceImage from "./multi-image";

export default interface ISectionHeader {
  logoImageTitle: string;
  logoLinkUrl: string;
  logoImagesUrls: IMultiDeviceImage;
  loginLink: string;
  loginLinkTitle: string;
  loginLinkIconUrl: string
}