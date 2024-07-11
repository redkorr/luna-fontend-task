import { SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/hooks/useApi';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Module } from '@/types';
import { Textarea } from './ui/textarea';

export const ModuleSchema: ZodType<Partial<Module>> = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  description: z.string().min(1, { message: 'This field is required' }),
  targetTemperature: z.coerce
    .number()
    .gte(0, { message: 'The value needs to be greater or equal to 0' })
    .lte(40, { message: 'The value needs to be smaller or equal to 40' }),
});

interface AddModuleFormProps {
  isSubmitted: boolean;
  setIsSubmitted: (arg: boolean) => void;
}

const AddModuleForm = ({ isSubmitted, setIsSubmitted }: AddModuleFormProps) => {
  const [formData, setFormData] = useState<Partial<Module>>({});
  const { callApi } = useApi(
    `/modules`,
    { method: 'POST', data: formData },
    false
  );

  const form = useForm({
    resolver: zodResolver(ModuleSchema),
  });

  useEffect(() => {
    if (!isSubmitted) return;

    callApi();
    setIsSubmitted(false);
  }, [formData, isSubmitted]);

  const onSubmit: SubmitHandler<Partial<Module>> = (data) => {
    setFormData(data);
    setIsSubmitted(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='targetTemperature'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target temperature</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value === '' ? undefined : e.target.valueAsNumber
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default AddModuleForm;
