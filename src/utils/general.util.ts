export const getPlainText = (str?: string) => {
  const doc = new DOMParser().parseFromString(str || '', 'text/html');
  return doc.body.textContent || "";
};