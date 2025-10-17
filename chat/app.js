let incomingFile = [];
let incomingMeta = null;

dc.onmessage = (event) => {
  if (typeof event.data === "string") {
    const data = JSON.parse(event.data);
    if (data.type === "file-meta") incomingMeta = data;
    if (data.type === "file-end") {
      const blob = new Blob(incomingFile);
      const url = URL.createObjectURL(blob);
      addMessage(`📥 Archivo recibido: <a href="${url}" download="${incomingMeta.fileName}">${incomingMeta.fileName}</a>`, false);
      incomingFile = [];
      incomingMeta = null;
    }
  } else {
    incomingFile.push(event.data);
  }
};
