declare module 'simple-peer' {
  interface SimplePeerData {
    type: string;
    sdp: string;
  }

  interface SimplePeerConfig {
    initiator: boolean;
    trickle: boolean;
    stream?: MediaStream;
  }

  class SimplePeer {
    constructor(opts?: SimplePeerConfig);
    signal(data: SimplePeerData): void;
    on(event: string, callback: (...args: any[]) => void): void;
    destroy(): void;
  }

  export = SimplePeer;
}