import RLP from 'rlp';

export const decodeRlpHex = (rlphex: string) => {
  const decodedU8Arr = RLP.decode(Uint8Array.from(Buffer.from(rlphex, 'hex')));
  const tHashArr = [];
  decodedU8Arr.forEach((hash) => {
    tHashArr.push(new TextDecoder().decode(hash));
  });
  return tHashArr;
};
