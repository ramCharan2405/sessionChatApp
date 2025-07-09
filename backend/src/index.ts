import { startLibp2pNode } from './libp2p/node';

async function main() {
  await startLibp2pNode();
  // Add more backend logic here (e.g., REST API, message relay, etc.)
}

main().catch(console.error);
