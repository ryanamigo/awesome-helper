'use client'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSetting } from "@/contexts/setting";
import { useToast } from "@/hooks/use-toast";
import { decrypt, encrypt } from "@/lib/n-crypto";
import { isJson, unescape } from "@/lib/utils";
import { useMemo, useState } from "react";
import JsonView from '@uiw/react-json-view'
import { useClipboard } from "@/hooks/use-clipboard";

export default function Page() {
  const [setting] = useSetting();
  // 待处理的文本
  const [text, setText] = useState('');
  // 加解密后的文本
  const [result, setResult] = useState('');

  const { toast } = useToast();

  const {copy} = useClipboard();

  const resultJsonObj = useMemo(() => {
    if (result && isJson(result) && setting?.formatJson) {
      return JSON.parse(result)
    }
    return undefined
  }, [result, setting])

  const handleEncrypt = () => {
    if (!text || !setting) return;
    const aesKey = setting.aesKey
    const aesIv = setting?.aesIv
    if (!aesKey || !aesIv) return;
    const encrypedText = encrypt(aesKey, aesIv, text) || '';
    setResult(encrypedText);
  }

  const handleDecrypt = () => {
    if (!text || !setting) return;
    const aesKey = setting.aesKey
    const aesIv = setting?.aesIv
    if (!aesKey || !aesIv) return;
    try {
      const decrypedText = decrypt(aesKey, aesIv, text) || '';
      const unescapedText = unescape(decrypedText);
      setResult(unescapedText);
    } catch (err) {
      console.log(err);
      toast({
        variant: 'destructive',
        description: '解密失败，请检查密钥或密文是否正确'
      })
    }
  }

  return (
    <div>
      <Textarea placeholder="输入待加密/解密文本" rows={5} value={text} onChange={(e) => setText(e.target.value)}>
      </Textarea>

      <div className="flex justify-center items-center my-4 gap-x-4">
        <Button variant="default" onClick={handleEncrypt} >加密</Button>
        <Button variant="default" onClick={handleDecrypt} >解密</Button>
      </div>

      <div className="cursor-pointer border border-solid min-h-[118px] p-2 rounded-md w-full break-all line-clamp-6 overflow-y-auto" onClick={() => copy(result)}>
        {result}
      </div>
      <p className="text-xs text-gray-400">点击文本可复制</p>
      {
        resultJsonObj && (
          <JsonView value={resultJsonObj}></JsonView>
        )
      }
    </div>
  )
}