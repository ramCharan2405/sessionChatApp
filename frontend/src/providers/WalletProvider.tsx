import { WagmiConfig, http } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Define Amoy chain using viem's defineChain
const amoy = defineChain({
  id: 167004,
  name: "OKX Amoy Testnet",
  network: "amoy",
  nativeCurrency: {
    name: "OKB",
    symbol: "OKB",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://okx-amoy-rpc.gateway.pokt.network"] },
    public: { http: ["https://okx-amoy-rpc.gateway.pokt.network"] },
  },
  blockExplorers: {
    default: { name: "OKLink", url: "https://www.oklink.com/amoy" },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: 'EtherChat',
  chains: [amoy],
  transports: {
    [amoy.id]: http(amoy.rpcUrls.default.http[0]),
  },
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
} 