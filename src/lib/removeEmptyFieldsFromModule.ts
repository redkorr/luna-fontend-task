import { Module } from '@/types';

export function removeEmptyFieldsFromModule(data: Partial<Module>) {
  Object.keys(data).forEach((key) => {
    if (
      data[key as keyof typeof data] === '' ||
      data[key as keyof typeof data] == null
    ) {
      delete data[key as keyof typeof data];
    }
  });
}
