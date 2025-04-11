import { sendGTMEvent } from "@next/third-parties/google";

export const getPlainText = (str?: string) => {
  const doc = new DOMParser().parseFromString(str || '', 'text/html');
  return doc.body.textContent || "";
};

export const sendDataLayerEvent = (eventData: any) => {
  sendGTMEvent({
    ...eventData,
    'content_text': eventData?.contentt_text?.substring(0, 150) || '[Conteúdo não disponível]',
    'page_url': window.location.href
  });
}