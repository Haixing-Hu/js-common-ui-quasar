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
import { QuasarAlertImpl } from '../src';

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
      onOk: jest.fn((callback) => {
        callback();
        return {};
      }),
    })),
  },
}));

describe('QuasarAlertImpl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show an alert dialog with fontawesome icon set', () => {
    IconSet.set({ name: 'fontawesome-v6' }, true);
    const alertImpl = new QuasarAlertImpl(Dialog);
    const title = 'Alert Title';
    const message = 'alert - message';

    alertImpl.show('info', title, message);

    expect(Dialog.create).toHaveBeenCalledWith({
      title: '<i class="mocked-info-icon"></i> Alert Title',
      message: 'alert - message',
      noEscDismiss: true,
      noBackdropDismiss: true,
      noRouteDismiss: false,
      seamless: false,
      html: true,
    });
  });

  it('should show an alert dialog with material icon set', () => {
    IconSet.set({ name: 'material-icons' }, true);
    const alertImpl = new QuasarAlertImpl(Dialog);
    const title = 'Alert Title';
    const message = 'alert - message';

    alertImpl.show('error', title, message);

    expect(Dialog.create).toHaveBeenCalledWith({
      title: '<i class="mocked-error-icon"></i> Alert Title',
      message: 'alert - message',
      noEscDismiss: true,
      noBackdropDismiss: true,
      noRouteDismiss: false,
      seamless: false,
      html: true,
    });
  });

  it('should throw error when Dialog plugin is not provided', () => {
    expect(() => new QuasarAlertImpl()).toThrow('The quasar `Dialog` plugin must be installed in `quasar.conf.js`.');
    expect(() => new QuasarAlertImpl({})).toThrow('The quasar `Dialog` plugin must be installed in `quasar.conf.js`.');
  });

  it('should return a promise that resolves when dialog is closed', async () => {
    const alertImpl = new QuasarAlertImpl(Dialog);
    const promise = alertImpl.show('warn', 'Warning', 'This is a warning');

    expect(promise).toBeInstanceOf(Promise);
    await expect(promise).resolves.toBeUndefined();
  });
});
