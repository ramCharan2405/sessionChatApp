import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN! });

export async function downloadFromIPFS(cid: string) {
  const res = await client.get(cid);
  if (!res) throw new Error('Not found');
  const files = await res.files();
  return files[0]; // returns a File object
}
