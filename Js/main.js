import { initHelia } from './node.js';
import { previewLocalFile, addFile, catFile, listDir } from './fileManager.js';

let helia, unixfs;
const statusEl = document.getElementById('status');

async function start() {
  statusEl.textContent = 'Starting...';
  ({ helia, unixfs } = await initHelia([/* bootstrap peers */]));
  statusEl.textContent = 'Online';
}
function stop() { statusEl.textContent = 'Offline'; }

// UI Bindings
document.getElementById('startNode').onclick = start;
document.getElementById('stopNode').onclick = stop;

const fileInput = document.getElementById('fileInput');
const previewEl = document.getElementById('preview');
fileInput.onchange = () => previewLocalFile(fileInput.files[0], previewEl);

// Upload
const cidOutput = document.getElementById('cidOutput');
document.getElementById('uploadBtn').onclick = async () => {
  const cid = await addFile(unixfs, fileInput.files[0]);
  cidOutput.textContent = cid;
};

// Retrieve
const cidInput = document.getElementById('cidInput');
const retrieveEl = document.getElementById('retrievedContent');
document.getElementById('retrieveBtn').onclick = async () => {
  retrieveEl.textContent = await catFile(unixfs, cidInput.value);
};

// List
const dirInput = document.getElementById('dirCidInput');
const listEl = document.getElementById('listOutput');
document.getElementById('listBtn').onclick = async () => {
  listEl.innerHTML = '';
  const items = await listDir(unixfs, dirInput.value);
  items.forEach(i => listEl.innerHTML += `<li>${i.name}: ${i.cid}</li>`);
};
