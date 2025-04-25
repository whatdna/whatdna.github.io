import Helia from 'https://cdn.jsdelivr.net/npm/helia@^3.0.0/dist/index.min.js';
import Unixfs from 'https://cdn.jsdelivr.net/npm/@helia/unixfs@^2.0.0/dist/index.min.js';
import { MemoryDatastore } from 'https://cdn.jsdelivr.net/npm/datastore-core@^9.0.0/dist/index.min.js';
import { MemoryBlockstore } from 'https://cdn.jsdelivr.net/npm/blockstore-core@^4.0.0/dist/index.min.js';

export async function initHelia(bootstrap = []) {
  const datastore = new MemoryDatastore();
  const blockstore = new MemoryBlockstore();
  const helia = await Helia.createHelia({ datastore, blockstore, libp2p: {
    config: { bootstrap }
  }});
  const unixfs = await Unixfs.unixfs(helia);
  return { helia, unixfs };
}
