////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getQuasarColor from '../src/impl/get-quasar-color';

describe('getQuasarColor', () => {
  it('should return "amber" for warn type', () => {
    expect(getQuasarColor('warn')).toBe('amber');
  });

  it('should return "red" for error type', () => {
    expect(getQuasarColor('error')).toBe('red');
  });

  it('should return "green" for success type', () => {
    expect(getQuasarColor('success')).toBe('green');
  });

  it('should return "purple" for debug type', () => {
    expect(getQuasarColor('debug')).toBe('purple');
  });

  it('should return "light-blue" for question type', () => {
    expect(getQuasarColor('question')).toBe('light-blue');
  });

  it('should return "light-blue" for info type', () => {
    expect(getQuasarColor('info')).toBe('light-blue');
  });

  it('should return "#616161" for unknown type', () => {
    expect(getQuasarColor('unknown')).toBe('#616161');
    expect(getQuasarColor('')).toBe('#616161');
    expect(getQuasarColor(null)).toBe('#616161');
    expect(getQuasarColor(undefined)).toBe('#616161');
  });
}); 