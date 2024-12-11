'use client'
import React, { useMemo } from 'react';
import { Toggle } from '../ui/toggle';
import { IoSettingsOutline } from "react-icons/io5";
import AesSetting from './aes-setting';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';
import CnidSetting from './cnid-setting';

const SettingComponentsMap: Record<string, React.FC> = {
  '/encryption-and-decryption/aes': AesSetting,
  '/num-gen/cnid': CnidSetting
}

const EmptySettingComponent = () => <></>;

const Setting: React.FC<{ isOpen: boolean, onToggle: (v: boolean) => void }> = ({ isOpen, onToggle}) => {
  const handlePressedChange = (value: boolean) => {
    onToggle(value)
  }
  const pathname = usePathname();

  const SettingComponents = useMemo(() => {
    if (SettingComponentsMap[pathname]) {
      return SettingComponentsMap[pathname]
    }
    return EmptySettingComponent
  }, [pathname])
  if (!SettingComponentsMap[pathname]) {
    return null;
  }
  return (
    <div>
      <div className={`h-[500px] border-solid shadow-lg overflow-y-auto rounded-xl transition-all fixed right-2 top-[80px] md:top-0 md:right-0 md:relative ${isOpen ? 'w-[300px] border' : 'w-0 border-none'}`}>
        <div className='p-4'>
          <div className='text-lg font-bold'>设置</div>
          <Separator className='my-2' />
          <SettingComponents />
        </div>
      </div>
      <div className='absolute top-[508px] right-4'>
        <Toggle className='shadow-lg' pressed={isOpen} aria-label='打开设置' onPressedChange={handlePressedChange}>
          <IoSettingsOutline fontSize={22} />
        </Toggle>
      </div>
    </div>
  )
}



export default Setting;
