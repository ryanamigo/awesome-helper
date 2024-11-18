'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import { generatorOrgCode } from '@/lib/org-code';
import React, { useState } from 'react';

const Page: React.FC = () => {
  const [orgCode, setOrgCode] = useState("");
  const { copy } = useClipboard();
  const handleGen = () => {
    const orgCodeRes = generatorOrgCode();
    setOrgCode(orgCodeRes);
  }
  return (
    <div className='mt-1'>
      <div className='flex items-center gap-2'>
        <Label className='flex-shrink-0'>组织机构代码</Label>
        <Input className='w-40' value={orgCode} readOnly onClick={() => copy(orgCode)} />
        <Button onClick={handleGen}>生成</Button>
      </div>
    </div>
  )
}

export default Page;
