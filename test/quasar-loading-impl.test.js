////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Loading } from 'quasar';
import { QuasarLoadingImpl } from '../src';

jest.mock('quasar', () => ({
  Loading: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

describe('QuasarLoadingImpl', () => {
  let loadingImpl;

  beforeEach(() => {
    jest.clearAllMocks();
    loadingImpl = new QuasarLoadingImpl(Loading);
  });

  it('should initialize correctly', () => {
    expect(loadingImpl.Loading).toBe(Loading);
  });

  it('should throw error when Loading plugin is not provided', () => {
    expect(() => new QuasarLoadingImpl()).toThrow('The quasar `Loading` plugin must be installed in `quasar.conf.js` and provided in the constructor of QuasarLoadingImpl.');
    expect(() => new QuasarLoadingImpl({})).toThrow('The quasar `Loading` plugin must be installed in `quasar.conf.js` and provided in the constructor of QuasarLoadingImpl.');
    expect(() => new QuasarLoadingImpl({ show: jest.fn() })).toThrow('The quasar `Loading` plugin must be installed in `quasar.conf.js` and provided in the constructor of QuasarLoadingImpl.');
    expect(() => new QuasarLoadingImpl({ hide: jest.fn() })).toThrow('The quasar `Loading` plugin must be installed in `quasar.conf.js` and provided in the constructor of QuasarLoadingImpl.');
  });

  it('should show loading with default options', () => {
    loadingImpl.show();
    expect(Loading.show).toHaveBeenCalledTimes(1);
    expect(Loading.show).toHaveBeenCalledWith();
  });

  it('should show loading with message', () => {
    const message = 'Loading...';
    loadingImpl.show(message);
    expect(Loading.show).toHaveBeenCalledTimes(1);
    expect(Loading.show).toHaveBeenCalledWith({ message });
  });

  it('should hide loading', () => {
    loadingImpl.hide();
    expect(Loading.hide).toHaveBeenCalledTimes(1);
  });
});
