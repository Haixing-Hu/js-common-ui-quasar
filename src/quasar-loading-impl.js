////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { LoadingImpl } from '@qubit-ltd/common-ui';

/**
 * 基于Quasar框架实现的{@link LoadingImpl}。
 *
 * @author 胡海星
 */
class QuasarLoadingImpl extends LoadingImpl {
  /**
   * 创建一个新的{@link QuasarLoadingImpl}。
   *
   * 注意我们不能直接在这个类库中从`quasar`导入`Loading.`，因为这样导入的`Loading`对象
   * 是个未被安装的插件。只有在最终的`quasar`项目中，`quasar-cli`才会根据配置自动安装
   * `Dialog`插件并将所有从`quasar`中导入的`Loading`对象修改为已经安装的插件。
   *
   * @param Loading
   *     一个Quasar对`Loading`组件。必须是最终项目从Quasar框架导入的`Loading`组件。
   */
  constructor(Loading) {
    super();
    if (!Loading || !Loading.show || !Loading.hide) {
      throw new Error('The quasar `Loading` plugin must be installed in `quasar.conf.js`.');
    }
    this.Loading = Loading;
  }

  /**
   * 显示一个载入遮盖层，提示正在载入中。
   *
   * @param {string} message
   *     提示信息。
   */
  show(message) {
    if (message) {
      this.Loading.show({ message });
    } else {
      this.Loading.show();
    }
  }

  /**
   * 清除当前载入提示遮盖层，隐藏载入提示框。
   */
  hide() {
    this.Loading.hide();
  }
}

export default QuasarLoadingImpl;
