import { getGateWay } from '@config'

const imgUrl = getGateWay('/images/agent/');

export const optimumProject1 = `${imgUrl}img1.png`;
export const optimumProject2 = `${imgUrl}img2.png`;
export const applyBanner = `${imgUrl}img3.png`;
export const joinAddAdv = `${imgUrl}img4.png`;
export const joinAddBg = `${imgUrl}img5.png`;
export const broker1 = `${imgUrl}img6.jpg`;
export const broker2 = `${imgUrl}img7.png`;
export const broker3 = `${imgUrl}img9.png`;
export const broker4 = `${imgUrl}img10.png`;
export const broker5 = `${imgUrl}img11.png`;
export const broker6 = `${imgUrl}img8.jpg`;
export const broker7 = `${imgUrl}img15.png`;
export const broker8 = `${imgUrl}img16.png`;
export const broker9 = `${imgUrl}img17.png`;

export const level1 = `${imgUrl}img13.png`;
export const friend = `${imgUrl}img14.jpg`;
export const friend2 = `${imgUrl}img12.png`;
export const friend3 = `${imgUrl}img18.jpg`;

export const jkbImgs = {};
export const zsImgs = {};

for (let i = 1; i < 18; i++) {
  jkbImgs[`i${i}`] = `${imgUrl}jkb/jkb_b${i}.jpg`
}

for (let i = 1; i < 8; i++) {
  zsImgs[`i${i}`] = `${imgUrl}zs/9zzs_b${i}.jpg`
}
