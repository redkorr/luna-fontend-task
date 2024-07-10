import { SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '@/hooks/useApi';
import { useParams } from 'react-router-dom';
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
import { DialogClose } from '@radix-ui/react-dialog';
import { removeEmptyFieldsFromModule } from '@/lib/removeEmptyFieldsFromModule';

export const ModuleSchema: ZodType<Partial<Module>> = z.object({
  name: z.optional(z.string()),
  description: z.optional(z.string({ message: 'dupa' })),
  targetTemperature: z.optional(
    z.coerce
      .number()
      .gte(0, { message: 'The value needs to be greater or equal to 0' })
      .lte(40, { message: 'The value needs to be smaller or equal to 40' })
  ),
});

interface ModuleFormProps {
  isSubmitted: boolean;
  setIsSubmitted: (arg: boolean) => void;
}

const ModuleForm = ({ isSubmitted, setIsSubmitted }: ModuleFormProps) => {
  const [formData, setFormData] = useState<Partial<Module>>({});
  const { id } = useParams();
  const { callApi } = useApi(
    `/modules/${id}`,
    { method: 'PATCH', data: formData },
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
    removeEmptyFieldsFromModule(data);
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
        <DialogClose asChild>
          <Button type='submit'>Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default ModuleForm;
