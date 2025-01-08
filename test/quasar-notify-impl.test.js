////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { mount } from '@vue/test-utils';
import { IconSet, Notify } from 'quasar';
import { notify, loading } from '@qubit-ltd/common-ui';
import { QuasarNotifyImpl, QuasarLoadingImpl } from '../src';

jest.mock('quasar', () => ({
  IconSet: {
    props: {
      name: '',
    },
    set: function setFn(props) {
      this.props = { ...this.props, ...props };
    },
  },
  Notify: {
    create: jest.fn(),
  },
  Loading: {
    show: jest.fn(),
    hide: jest.fn(),
  },
}));

// Mock the Dialog.create method

loading.setImpl(new QuasarLoadingImpl());
notify.setImpl(new QuasarNotifyImpl());

describe('QuasarNotifyImpl', () => {
  it('should show a notify message with fontawesome icon set', async () => {
    IconSet.set({
      name: 'fontawesome-v6',
    }, true);
    const closeAction = () => {};
    const wrapper = mount({
      template: '<div></div>',
      mounted() {
        notify.info('message', {
          closeAction,
        });
      },
    });
    await wrapper.vm.$nextTick();
    expect(Notify.create).toBeCalledWith({
      message: 'message',
      icon: 'fa-solid fa-circle-info',
      iconColor: 'light-blue',
      iconSize: '1.5em',
      html: true,
      position: 'top-right',
      timeout: 3000,
      multiLine: false,
      color: 'white',
      textColor: 'black',
      actions: [
        { label: '关闭', handler: closeAction },
      ],
    });
  });
  it('should show a notify message with material icon set', async () => {
    IconSet.set({
      name: 'material-symbol',
    }, true);
    const closeAction = () => {};
    const detailAction = () => {};
    const wrapper = mount({
      template: '<div></div>',
      mounted() {
        notify.warn('message', {
          closeable: true,
          closeAction,
          showDetail: true,
          detailAction,
        });
      },
    });
    await wrapper.vm.$nextTick();
    expect(Notify.create).toBeCalledWith({
      message: 'message',
      icon: 'warning',
      iconColor: 'amber',
      iconSize: '1.5em',
      html: true,
      position: 'top-right',
      timeout: 3000,
      multiLine: false,
      color: 'white',
      textColor: 'black',
      actions: [
        { label: '详情', handler: detailAction },
        { label: '关闭', handler: closeAction },
      ],
    });
  });
});
