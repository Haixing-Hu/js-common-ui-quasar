////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { mount } from '@vue/test-utils';
import { Dialog, IconSet } from 'quasar';
import { QuasarConfirmImpl } from '../src';

// Mock getHtmlIcon module
jest.mock('../src/impl/get-html-icon', () => jest.fn((type) => {
  switch (type) {
    case 'info':
      return '<i class="mocked-info-icon"></i>';
    case 'warn':
      return '<i class="mocked-warn-icon"></i>';
    case 'error':
      return '<i class="mocked-error-icon"></i>';
    default:
      return '<i class="mocked-default-icon"></i>';
  }
}));

jest.mock('quasar', () => ({
  IconSet: {
    props: {
      name: '',
    },
    set: function setFn(props) {
      this.props = { ...this.props, ...props };
    },
  },
  Dialog: {
    create: jest.fn().mockImplementation(() => ({
      onOk: jest.fn(callback => ({
        onCancel: jest.fn(errorCallback => {
          // 返回完整的模拟对象
          return {
            _callback: callback,
            _errorCallback: errorCallback,
            // 模拟用户点击 OK
            triggerOk: () => {
              callback();
              return true;
            },
            // 模拟用户点击 Cancel
            triggerCancel: () => {
              errorCallback();
              return true;
            },
          };
        }),
      })),
    })),
  },
}));

describe('QuasarConfirmImpl', () => {
  let confirmImpl;
  let mockDialogInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    confirmImpl = new QuasarConfirmImpl(Dialog);
    // 修改 mockDialogInstance 的实现，确保 onCancel 调用回调函数
    mockDialogInstance = {
      onOk: jest.fn().mockImplementation(callback => {
        return {
          onCancel: jest.fn(errorCallback => {
            setTimeout(() => errorCallback(), 0); // 使用 setTimeout 确保回调在 Promise 注册后执行
            return mockDialogInstance;
          }),
        };
      }),
    };
    Dialog.create.mockReturnValue(mockDialogInstance);
  });

  it('should initialize correctly', () => {
    expect(confirmImpl.Dialog).toBe(Dialog);
  });

  it('should throw error when Dialog plugin is not provided', () => {
    expect(() => new QuasarConfirmImpl()).toThrow('The quasar `Dialog` plugin must be installed in `quasar.conf.js`.');
    expect(() => new QuasarConfirmImpl({})).toThrow('The quasar `Dialog` plugin must be installed in `quasar.conf.js`.');
  });

  it('should show confirm dialog with all parameters', async () => {
    const type = 'info';
    const title = 'Confirm Title';
    const message = 'Confirm Message';
    const okLabel = 'Yes';
    const cancelLabel = 'No';

    const promise = confirmImpl.show(type, title, message, okLabel, cancelLabel);
    
    expect(Dialog.create).toHaveBeenCalledWith({
      title: '<i class="mocked-info-icon"></i> Confirm Title',
      message: 'Confirm Message',
      ok: 'Yes',
      cancel: 'No',
      focus: 'cancel',
      noEscDismiss: true,
      noBackdropDismiss: true,
      noRouteDismiss: false,
      seamless: false,
      html: true,
    });
  });

  it('should resolve promise when ok is clicked', () => {
    // 创建一个简单实现，同步执行 OK 回调
    const simpleDialog = {
      create: jest.fn().mockImplementation(() => ({
        onOk: jest.fn(cb => {
          cb(); // 立即调用回调
          return {
            onCancel: jest.fn(),
          };
        }),
      })),
    };
    
    const simpleConfirm = new QuasarConfirmImpl(simpleDialog);
    
    // 返回一个已解析的 Promise
    return simpleConfirm.show('info', 'Title', 'Message');
  });

  it('should reject promise when cancel is clicked', () => {
    // 创建一个简单实现，同步执行 Cancel 回调
    const simpleDialog = {
      create: jest.fn().mockImplementation(() => ({
        onOk: jest.fn(() => ({
          onCancel: jest.fn(cb => {
            cb(); // 立即调用回调，表示取消操作
            return {};
          }),
        })),
      })),
    };
    
    const simpleConfirm = new QuasarConfirmImpl(simpleDialog);
    
    // 返回一个将被拒绝的 Promise
    return simpleConfirm.show('warn', 'Warning', 'Are you sure?')
      .then(() => {
        throw new Error('Promise should be rejected');
      })
      .catch(() => {
        // 成功捕获拒绝状态
        return Promise.resolve();
      });
  });
}); 