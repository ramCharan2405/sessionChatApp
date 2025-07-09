import { useContractWrite, useContractRead } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/contract';

// Hook to send a message
export function useSendMessage() {
  return useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'sendMessage',
  });
}

// Hook to get messages between two users
export function useGetMessages(from: string, to: string) {
  return useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMessages',
    args: [from, to],
  });
} 