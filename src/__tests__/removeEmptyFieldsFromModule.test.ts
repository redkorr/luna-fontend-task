import { removeEmptyFieldsFromModule } from '@/lib/removeEmptyFieldsFromModule';
import { Module } from '@/types';
import { describe, expect, it } from 'vitest';

describe('removeEmptyFieldsFromModule', () => {
  it('Should remove keys that have an empty string', () => {
    const data: Partial<Module> = {
      name: '',
      targetTemperature: 10.0,
    };

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({ targetTemperature: 10.0 });
  });

  it('Should remove keys that have a undefined', () => {
    const data: Partial<Module> = {
      name: undefined,
      targetTemperature: 10.0,
    };

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({ targetTemperature: 10.0 });
  });

  it('Should remove keys that are either empty string or undefined', () => {
    const data: Partial<Module> = {
      name: '',
      description: undefined,
      targetTemperature: 10.0,
    };

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({ targetTemperature: 10.0 });
  });

  it('Should NOT remove keys that are NOT empty', () => {
    const data: Partial<Module> = {
      name: 'test',
      description: 'test',
      targetTemperature: 10.0,
    };

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({
      name: 'test',
      description: 'test',
      targetTemperature: 10.0,
    });
  });

  it('Should handle empty object', () => {
    const data: Partial<Module> = {};

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({});
  });

  it('Should handle an object with only empty keys', () => {
    const data: Partial<Module> = {
      name: '',
      description: '',
      targetTemperature: undefined,
    };

    removeEmptyFieldsFromModule(data);

    expect(data).toEqual({});
  });
});
