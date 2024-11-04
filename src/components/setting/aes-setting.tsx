import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { getSettingFromLocalStorage, useSetting } from '@/contexts/setting';

const localSetting = getSettingFromLocalStorage();

const formSchema = z.object({
  aesKey: z.string().length(16, '请输入密钥'),
  aesIv: z.string().length(16, '请输入偏移量').regex(/^[0-9a-z]+$/, '格式错误'),
})
const AesSetting: React.FC = () => {
  const [, save] = useSetting();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aesMode: localSetting?.aesMode || 'CBC',
      aesPadding: localSetting?.aesPadding || 'PKCS7',
      aesKey: localSetting?.aesKey || '',
      aesIv: localSetting?.aesIv || '',
      formatJson: localSetting?.formatJson || false,
    }
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const values = form.getValues();
    save(values);
    // 阻止页面刷新
    e.preventDefault();
    return false;
  }
  return (
    <Form {...form} >
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="aesMode"
          render={( { field }) => {
            return (
              <FormItem>
                <FormLabel>加密模式</FormLabel>
                  <Select name="aesMode" onValueChange={(value) => value ? field.onChange(value) : null} value={field.value}>
                    <FormControl> 
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="加密模式" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CBC">CBC</SelectItem>
                      <SelectItem disabled value="ECB">ECB(暂不支持)</SelectItem>
                    </SelectContent>
                  </Select>
              </FormItem>
            )
          }}
        >
        </FormField>
        <FormField
          control={form.control}
          name="aesPadding"
          render={( { field }) => (
            <FormItem>
              <FormLabel>填充方式</FormLabel>
                <Select name="aesPadding" onValueChange={(value) => value ? field.onChange(value) : null} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="填充模式" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PKCS7">PKCS7</SelectItem>
                    <SelectItem disabled value="ZEROS">ZEROS(暂不支持)</SelectItem>
                    <SelectItem disabled value="ANSIX923">ANSIX923(暂不支持)</SelectItem>
                    <SelectItem disabled value="ISO10126">ISO10126(暂不支持)</SelectItem>
                  </SelectContent>
                </Select>
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name="aesKey"
          render={( { field }) => (
            <FormItem>
              <FormLabel>密钥</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        >

        </FormField>
        <FormField
          control={form.control}
          name="aesIv"
          render={( { field }) => (
            <FormItem>
              <FormLabel>偏移量</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} value={field.value || ''}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        >
        </FormField>
        <FormField
          control={form.control}
          name="formatJson"
          render={( { field }) => (
            <FormItem>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormLabel>自动格式化json</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        >
        </FormField>
        <Button type="submit">保存</Button>
      </form>
    </Form>
  )
}

export default AesSetting;
