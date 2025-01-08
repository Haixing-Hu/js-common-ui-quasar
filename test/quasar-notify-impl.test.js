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
        notify.show('info', 'message', {
          closeAction,
        });
      },
    });
    await wrapper.vm.$nextTick();
    expect(Notify.create).toBeCalledWith({
      message: '<i class="fa-solid fa-circle-info fa-lg" style="color: #1976D2"></i>message',
      html: true,
      position: 'top-right',
      timeout: 3000,
      multiLine: false,
      actions: [
        { icon: 'close', color: 'white', handler: closeAction },
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
        notify.show('info', 'message', {
          closeable: true,
          closeAction,
          showDetail: true,
          detailAction,
        });
      },
    });
    await wrapper.vm.$nextTick();
    expect(Notify.create).toBeCalledWith({
      message: '<i class="material-symbols-rounded" '
        + 'style="font-variation-settings: \'FILL\' 1, \'wght\' 400, \'GRAD\' 0, \'opsz\' 48; '
        + 'color: #1976D2;">info</i>message',
      html: true,
      position: 'top-right',
      timeout: 3000,
      multiLine: false,
      actions: [
        { label: '详情', color: 'white', handler: detailAction },
        { label: '关闭', color: 'white', handler: closeAction },
      ],
    });
  });
});
