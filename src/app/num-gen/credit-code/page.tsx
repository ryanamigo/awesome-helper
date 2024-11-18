'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import { generatorCreditCode } from '@/lib/credit-code';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [creditCode, setCreditCode] = useState("");
  const { copy } = useClipboard();
  const handleGen = () => {
    const codeRes = generatorCreditCode();
    setCreditCode(codeRes);
  }
  return (
    <div className='mt-1'>
      <div className='flex items-center gap-2'>
        <Label className='flex-shrink-0'>统一社会信用代码</Label>
        <Input className='w-[200px]' value={creditCode} readOnly onClick={() => copy(creditCode)} />
        <Button onClick={handleGen}>生成</Button>
      </div>
    </div>
  )
}

export default Page;
