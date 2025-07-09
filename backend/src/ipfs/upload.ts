import { Web3Storage, File } from 'web3.storage';

const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN! });

export async function uploadToIPFS(data: Uint8Array | string) {
  const file = new File([data], 'message.enc');
  const cid = await client.put([file]);
  return cid;
}
