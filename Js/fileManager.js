export function previewLocalFile(file, container) {
  const reader = new FileReader();
  reader.onload = e => {
    container.innerHTML = '';
    const url = e.target.result;
    if (file.type.startsWith('image/')) container.innerHTML = `<img src="${url}" />`;
    else if (file.type.startsWith('video/')) container.innerHTML = `<video controls src="${url}"></video>`;
    else if (file.type.startsWith('audio/')) container.innerHTML = `<audio controls src="${url}"></audio>`;
    else container.textContent = 'Preview not supported';
  };
  reader.readAsDataURL(file);
}

export async function addFile(unixfs, file) {
  const array = new Uint8Array(await file.arrayBuffer());
  const { cid } = await unixfs.addBytes(array);
  return cid.toString();
}

export async function catFile(unixfs, cid) {
  let content = '';
  const decoder = new TextDecoder();
  for await (const chunk of unixfs.cat(cid)) content += decoder.decode(chunk, { stream: true });
  return content;
}

export async function listDir(unixfs, cid) {
  const entries = [];
  for await (const entry of unixfs.ls(cid)) entries.push({ name: entry.name, cid: entry.cid.toString() });
  return entries;
}
