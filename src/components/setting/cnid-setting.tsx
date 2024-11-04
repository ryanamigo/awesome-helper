import { getSettingFromLocalStorage, useSetting } from '@/contexts/setting';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const localSetting = getSettingFromLocalStorage();

const CnIdSetting: React.FC = () => {
  const [, save] = useSetting();
  const form = useForm({
    defaultValues: {
      cnidGenCount: localSetting?.cnidGenCount || 5,
    }
  })
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const values = form.getValues();
    save(values);
    // 阻止页面刷新
    e.preventDefault();
    return false;
  }
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="cnidGenCount"
          render={( { field }) => (
            <FormItem>
              <FormLabel>生成数量</FormLabel>
              <FormControl>
                <Input type="number" placeholder="生成数量" onChange={field.onChange} value={field.value || ''} />
              </FormControl>
            </FormItem>
          )}
        >
        </FormField>
        <Button type="submit">保存</Button>
      </form>
    </Form>
  )
}

export default CnIdSetting;
