////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import * as allExports from '../src/index';
import getQuasarIconSetName from '../src/get-quasar-icon-set';
import QuasarAlertImpl from '../src/quasar-alert-impl';
import QuasarConfirmImpl from '../src/quasar-confirm-impl';
import QuasarLoadingImpl from '../src/quasar-loading-impl';
import QuasarNotifyImpl from '../src/quasar-notify-impl';

// 从 index.js 中导入的内容
import {
  getQuasarIconSetName as indexGetQuasarIconSetName,
  QuasarAlertImpl as indexQuasarAlertImpl,
  QuasarConfirmImpl as indexQuasarConfirmImpl,
  QuasarLoadingImpl as indexQuasarLoadingImpl,
  QuasarNotifyImpl as indexQuasarNotifyImpl,
} from '../src';

describe('index.js exports', () => {
  it('should export getQuasarIconSetName', () => {
    expect(indexGetQuasarIconSetName).toBe(getQuasarIconSetName);
  });

  it('should export QuasarAlertImpl', () => {
    expect(indexQuasarAlertImpl).toBe(QuasarAlertImpl);
  });

  it('should export QuasarConfirmImpl', () => {
    expect(indexQuasarConfirmImpl).toBe(QuasarConfirmImpl);
  });

  it('should export QuasarLoadingImpl', () => {
    expect(indexQuasarLoadingImpl).toBe(QuasarLoadingImpl);
  });

  it('should export QuasarNotifyImpl', () => {
    expect(indexQuasarNotifyImpl).toBe(QuasarNotifyImpl);
  });

  it('should not export any unexpected members', () => {
    const expectedExports = [
      'getQuasarIconSetName',
      'QuasarAlertImpl',
      'QuasarConfirmImpl',
      'QuasarLoadingImpl',
      'QuasarNotifyImpl',
    ];
    const actualExports = Object.keys(allExports);
    expect(actualExports.sort()).toEqual(expectedExports.sort());
  });

  it('should execute all export statements', () => {
    // 直接导入 index.js 文件，强制执行其中的所有代码
    jest.resetModules();
    require('../src/index');
  });
});
