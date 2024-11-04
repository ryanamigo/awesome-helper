'use client'

import { useToast } from '@/hooks/use-toast';
import React, { PropsWithChildren, useEffect, useState } from 'react';

type AesSettingOptions = {
  aesMode: string;
  aesPadding: string;
  aesKey: string;
  aesIv: string;
  formatJson: boolean;
}

type CnIdOptions = {
  cnidGenCount: number;
}

export type SettingOptions = AesSettingOptions & CnIdOptions

export const getSettingFromLocalStorage = () => {
  const localSetting = localStorage.getItem('setting')
  if (localSetting) {
    const json = JSON.parse(localSetting)
    return json
  }
  return null;
}

const defaultValue: SettingOptions =  {
  aesMode: 'CBC',
  aesPadding: 'PKCS7',
  aesKey: '1234567890000000',
  aesIv: '1234567890000000',
  formatJson: true,
  cnidGenCount: 5,
}

const SettingContext = React.createContext<{
  setting: Partial<SettingOptions> | null,
  save: (options: Partial<SettingOptions>) => void
}>({
  setting: null,
  save: () => {}
})

export const SettingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [setting, saveSetting] = useState<Partial<SettingOptions> | null>(null)
  const { toast } = useToast();
  useEffect(() => {
    const localSetting = getSettingFromLocalStorage();
    if (localSetting) {
      saveSetting(localSetting)
    } else {
      saveSetting(defaultValue)
      localStorage.setItem('setting', JSON.stringify(defaultValue))
    }
  }, [])
  const save = (options: Partial<SettingOptions>) => {
    const result = { ...setting, ...options }
    saveSetting(result)
    // 同步到localstorage
    localStorage.setItem('setting', JSON.stringify({ ...setting, ...options }))
    toast({
      variant: 'default',
      description: '设置已保存',
    })
  }
  return (
    <SettingContext.Provider value={{ setting, save}}>
      {children}
    </SettingContext.Provider>
  )
}

export function useSetting() {
  const {setting, save} =  React.useContext(SettingContext)
  return [setting, save] as [typeof setting, typeof save]
}

export function useSettingOptions() {
  const {setting} = React.useContext(SettingContext)
  return [setting]
}

export default SettingProvider