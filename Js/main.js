import { initHelia } from './heliaNode.js';
import { previewLocalFile, addFile, catFile, listDir } from './fileManager.js';

let helia, fs;
const statusEl = document.getElementById('status');
const fileInput = document.getElementById('fileInput');
const previewEl = document.getElementById('preview');
const cidOutput = document.getElementById('cidOutput');
const retrievedContentEl = document.getElementById('retrievedContent');
const listOutput = document.getElementById('listOutput');

// Запуск и остановка узла
window.startNode = async () => {
  statusEl.textContent = 'Запуск...';
  ({ helia, fs } = await initHelia(/* [список bootstrap peers] */));
  statusEl.textContent = 'Online';
};
window.stopNode = () => {
  statusEl.textContent = 'Offline';
  helia.libp2p.stop();
};

// Предпросмотр файла
fileInput.onchange = () => previewLocalFile(fileInput.files[0], previewEl);

// Загрузка файла
document.getElementById('uploadBtn').onclick = async () => {
  const cid = await addFile(fs, fileInput.files[0]);
  cidOutput.textContent = cid;
};

// Получение контента
document.getElementById('retrieveBtn').onclick = async () => {
  retrievedContentEl.textContent = await catFile(fs, document.getElementById('cidInput').value);
};

// Листинг директории
document.getElementById('listBtn').onclick = async () => {
  listOutput.innerHTML = '';
  const items = await listDir(fs, document.getElementById('dirCidInput').value);
  items.forEach(i => listOutput.innerHTML += `<li>${i.name}: ${i.cid}</li>`);
};
