import { Web3Storage, File } from 'web3.storage';

// Initialize Web3Storage client with your API token
const client = new Web3Storage({ token: import.meta.env.VITE_WEB3STORAGE_TOKEN! });

// Upload encrypted message to IPFS
export async function uploadToIPFS(data: Uint8Array | string) {
  const file = new File([data], 'message.enc');
  const cid = await client.put([file]);
  return cid;
} 