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
import { alert, loading } from '@qubit-ltd/common-ui';
import { QuasarAlertImpl, QuasarLoadingImpl } from '../src';

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
      onOk: jest.fn((callback) => callback()),
    })),
  },
  Loading: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

// Mock the Dialog.create method

loading.setImpl(new QuasarLoadingImpl());
alert.setImpl(new QuasarAlertImpl());

describe('QuasarAlertImpl', () => {
  it('should show an alert dialog with fontawesome icon set', async () => {
    IconSet.set({
      name: 'fontawesome-v6',
    }, true);
    const wrapper = mount({
      template: '<div></div>',
      mounted() {
        alert.show('info', 'title', 'message');
      },
    });
    await wrapper.vm.$nextTick();
    expect(Dialog.create).toBeCalledWith({
      title: '<i class="fa-solid fa-circle-info" style="font-size: 1.5em; color: #1976D2"></i> title',
      message: 'message',
      noEscDismiss: true,
      noBackdropDismiss: true,
      noRouteDismiss: false,
      seamless: false,
      html: true,
    });
  });
  it('should show an alert dialog with material icon set', async () => {
    IconSet.set({
      name: 'material-symbol',
    }, true);
    const wrapper = mount({
      template: '<div></div>',
      mounted() {
        alert.show('info', 'title', 'message');
      },
    });
    await wrapper.vm.$nextTick();
    expect(Dialog.create).toBeCalledWith({
      title: '<i class="material-symbols-rounded" '
        + 'style="font-variation-settings: \'FILL\' 1, \'wght\' 400, \'GRAD\' 0, \'opsz\' 48; '
        + 'font-size: 1.5em; '
        + 'color: #1976D2;">info</i> title',
      message: 'message',
      noEscDismiss: true,
      noBackdropDismiss: true,
      noRouteDismiss: false,
      seamless: false,
      html: true,
    });
  });
});
