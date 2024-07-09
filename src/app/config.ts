// // use NODE_ENV to not have to change config based on where it's deployed
export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : 'https://adframeview.vercel.app';
// export const NEXT_PUBLIC_URL =
//   process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : 'https://adbase-api.onrender.com';
export const BUY_MY_COFFEE_CONTRACT_ADDR = '0xcD3D5E4E498BAb2e0832257569c3Fd4AE439dD6f';
export const BASE_COLORS_CONTRACT_ADDR = '0x84a5413b6d840c75dc8e5f6eb56e0d1c3ed3337c';
export const NEYNAR_ONCHAIN_KIT = process.env.NEYNAR_API_KEY;
