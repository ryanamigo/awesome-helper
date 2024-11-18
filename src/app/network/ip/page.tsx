'use client'
import { getIpNeo } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';
import { GrLocation } from "react-icons/gr";
import { IoGlobeOutline } from "react-icons/io5";
import { ImSpinner } from "react-icons/im";

const Page: React.FC = () => {

  const [ipInfo, setIpInfo] = useState<IpNeo>();
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();
  const getIpInfo = async () => {
    setLoading(true)
    try {
      const res = await getIpNeo();
    if (res.data) {
      setIpInfo(res.data)
    }  
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        description: '获取IP信息失败，请重试'
      })
    }  finally {
      setLoading(false)
    }
    
  }
  useEffect(() => {
    getIpInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Button className='mb-4' onClick={getIpInfo}>刷新</Button>
      <Card>
        <CardHeader>
          <CardTitle>您的IP信息</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {
            loading && (
              <ImSpinner className='animate-spin text-2xl' />
            )
          }
          {
            !loading && ipInfo && (
              <>
                <div className='test-xl font-bold'>{ipInfo.ip}</div>
                <div className='flex items-center gap-2'>
                  <GrLocation />
                  <span>{ipInfo.country} {ipInfo.region || ''} - {ipInfo.city}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <IoGlobeOutline />
                  <span>{ipInfo.isp}</span>
                </div>
              </>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default Page;
