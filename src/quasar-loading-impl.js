////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Loading } from 'quasar';
import { LoadingImpl } from '@qubit-ltd/common-ui';

/**
 * 基于Quasar框架实现的{@link LoadingImpl}。
 *
 * @author 胡海星
 */
class QuasarLoadingImpl extends LoadingImpl {
  /**
   * 显示一个载入遮盖层，提示正在载入中。
   *
   * @param {string} message
   *     提示信息。
   */
  show(message) {
    if (message) {
      Loading.show({ message });
    } else {
      Loading.show();
    }
  }

  /**
   * 清除当前载入提示遮盖层，隐藏载入提示框。
   */
  hind() {
    Loading.hide();
  }
}

export default QuasarLoadingImpl;
