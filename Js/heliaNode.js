// Импортируем именованные функции из Helia и UnixFS
import { createHelia } from 'https://cdn.jsdelivr.net/npm/helia@^3.0.0/dist/index.min.js';
import { unixfs } from 'https://cdn.jsdelivr.net/npm/@helia/unixfs@^5.0.0/dist/index.min.js';
import { memoryDatastore } from 'https://cdn.jsdelivr.net/npm/datastore-core@^9.0.0/dist/index.min.js';
import { memoryBlockstore } from 'https://cdn.jsdelivr.net/npm/blockstore-core@^4.0.0/dist/index.min.js';

/**
 * Инициализация Helia-узла с памятью в браузере
 * Возвращает объект { helia, unixfs } для работы
 */
export async function initHelia(bootstrapPeers = []) {
  const datastore = new MemoryDatastore();
  const blockstore = new MemoryBlockstore();
  // Создаём Helia-узел
  const helia = await createHelia({
    datastore,
    blockstore,
    libp2p: {
      config: { bootstrap: bootstrapPeers }
    }
  });
  // Оборачиваем в UnixFS
  const fs = await unixfs(helia);
  return { helia, fs };
}
