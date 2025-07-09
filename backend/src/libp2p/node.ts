import { createLibp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { webRTC } from '@libp2p/webrtc';
import { noise } from '@chainsafe/libp2p-noise';
import { mplex } from '@libp2p/mplex';

export async function startLibp2pNode() {
  const node = await createLibp2p({
    transports: [webSockets(), webRTC()],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
  });
  await node.start();
  console.log('libp2p node started with id:', node.peerId.toString());
  return node;
}
