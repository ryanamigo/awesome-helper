'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
/**
 * 参照标准：
 * 正面
 * 左上角为国徽，用红色油墨印刷;其右侧为证件名称"中华人民共和国居民身份证"，
 * 分上下两排排列，其中上排的"中华人民共和国"为4号宋体字，下排的"居民身份证"为2号宋体字;
 * "签发机关"、"有效期限"为6号加粗黑体字;签发机关登记项采用，"xx市公安局";
 * 有效期限采用"xxxx.xx-xxxx.xx.xx"格式，使用5号黑体字印刷，全部用黑色油墨印刷。
 * 背面
 * "姓名"、"性别"、"民族"、"出生年月日"、"住址"、"公民身份号码"为6  号黑体字，用蓝色油墨印刷；
 * 登记项目中的姓名项用5号黑体字印刷；其他项目则用小5号黑体字印刷；
 * 出生年月日 方正黑体简体字符大小：姓名＋号码（11点）其他（9点）字符间距（AV）：号码（50）字符行距：住址（12点）；
 * 身份证号码字体 OCR-B 10 BT 文字 华文细黑。
 * @returns 
 */

const drawImage = (ctx: CanvasRenderingContext2D, imageUrl: string, x: number, y: number, w: number, h: number) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempCtx.drawImage(img, 0, 0);
        ctx.drawImage(tempCanvas, x, y, w, h);
      } else {
        ctx.drawImage(img, x, y, w, h);
      }
      resolve(true);
    }
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    }
  })
}

const createHDCanvas = (canvas: HTMLCanvasElement, w: number, h: number) => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = w * ratio; // 实际渲染像素
  canvas.height = h * ratio; // 实际渲染像素
  canvas.style.width = `${w}px`; // 控制显示大小
  canvas.style.height = `${h}px`; // 控制显示大小
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.scale(ratio, ratio);
  }
  return ctx;
}

type CitizenIdCardProps = {
  cnid: string;
  gender: string;
  regionName: string;
  birthday: string;
  onClick?: () => void;
}

const CitizenIdCard: React.FC<CitizenIdCardProps> = ({ cnid, gender, regionName, birthday, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await document.fonts.load('12px OCR-B');
        setFontLoaded(true);
      } catch (error) {
        console.error('Font loading failed:', error);
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  const drawBackText = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.textRendering = 'optimizeLegibility';
    // birthday 20000101
    const year = birthday.slice(0, 4);
    const month = birthday.slice(4, 6);
    const day = birthday.slice(6, 8);
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('胡图图', 65, 48);
    ctx.font = '12px Arial';
    ctx.fillText(gender, 65, 75 );
    ctx.fillText('汉族', 140, 75);
    ctx.fillText(year, 65, 100)
    ctx.fillText(month, 125, 100)
    ctx.fillText(day, 155, 100)
    const address = regionName + '翻斗大街翻斗花园二号楼一零零一室'
    // 每行最多 10个字 
    const lines = address.match(/.{1,13}/g) || [];
    lines.forEach((line, index) => {
      ctx.fillText(line, 65, 125 + index * 15);
    });
    if (fontLoaded) {
      ctx.font = '14px OCR-B';
      ctx.fillText(cnid, 100, 194);
    }
  }, [cnid, gender, regionName, birthday, fontLoaded])

  const drawBack = useCallback(async (ctx: CanvasRenderingContext2D) => {
    setLoading(true);
    try {
      await drawImage(ctx, '/empty-card-1.png', 0, 0, 350, 220);
      await drawImage(ctx, '/avatars/panda.png', 230, 30, 98, 137);
      drawBackText(ctx);
    } finally {
      setLoading(false);
    }
  }, [cnid, gender, regionName, birthday, fontLoaded])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && fontLoaded) {
      const ctx = createHDCanvas(canvas, 350, 220);
      if (ctx) {
        drawBack(ctx);
      }
    }
  }, [canvasRef, fontLoaded])

  return (
    <div onClick={onClick}>
      {(loading || !fontLoaded) && <div className="loading">Loading...</div>}
      <canvas 
        ref={canvasRef} 
        width={350} 
        height={220} 
        style={{ visibility: fontLoaded ? 'visible' : 'hidden' }} 
      />
    </div>
  )
};

export default CitizenIdCard;
