import '../styles/globals.css';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import dynamic from 'next/dynamic';

// fixes "Warning: useLayoutEffect does nothing on the server" warning spam from next.js
const ChannelProvider = dynamic(() => import('ably/react').then((module) => module.ChannelProvider), { ssr: false });

export default function App({ Component, pageProps }) {
  const client = new Ably.Realtime({
    authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="headlines" options={{ params: { rewind: '5' } }}>
      <ChannelProvider channelName="combat-effects" options={{ params: { rewind: '5' } }}>
        <ChannelProvider channelName="world-effects" options={{ params: { rewind: '5' } }}>
        <ChannelProvider channelName="personal-effects" options={{ params: { rewind: '5' } }}>
          <ChannelProvider channelName='dice-roll' options={{ params: { rewind: '5' } }}>
        <Component {...pageProps} />;
        </ChannelProvider>
        </ChannelProvider>
        </ChannelProvider>
        </ChannelProvider>
      </ChannelProvider>
    </AblyProvider>
  );
}