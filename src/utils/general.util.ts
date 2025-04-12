import { sendGTMEvent } from "@next/third-parties/google";

export const getPlainText = (str?: string) => {
  const doc = new DOMParser().parseFromString(str || '', 'text/html');
  return doc.body.textContent || "";
};

export const sendDataLayerEvent = (eventData: any) => {
  console.info('evento de dataLayer recebido:, ', eventData);
  sendGTMEvent({
    ...eventData,
    ...(eventData?.content_text ? {'content_text': eventData?.content_text?.substring(0, 150)} : {}),
    'page_url': window.location.href
  });
}