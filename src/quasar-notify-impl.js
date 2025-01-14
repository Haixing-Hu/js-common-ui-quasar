////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { NotifyImpl } from '@qubit-ltd/common-ui';
import getQuasarColor from './impl/get-quasar-color';
import getQuasarIcon from './impl/get-quasar-icon';

/**
 * 基于Quasar框架实现的{@link NotifyImpl}。
 *
 * @author 胡海星
 */
class QuasarNotifyImpl extends NotifyImpl {
  /**
   * 创建一个新的{@link QuasarLoadingImpl}。
   *
   * 注意我们不能直接在这个类库中从`quasar`导入`Notify.`，因为这样导入的`Notify`对象
   * 是个未被安装的插件。只有在最终的`quasar`项目中，`quasar-cli`才会根据配置自动安装
   * `Dialog`插件并将所有从`quasar`中导入的`Notify`对象修改为已经安装的插件。
   *
   * @param Notify
   *     一个Quasar对`Notify`组件。必须是最终项目从Quasar框架导入的`Notify`组件。
   */
  constructor(Notify) {
    super();
    if (!Notify || !Notify.create) {
      throw new Error('The quasar `Notify` plugin must be installed in `quasar.conf.js`.');
    }
    this.Notify = Notify;
  }

  /**
   * 显示一条通知消息。
   *
   * @param {string} type
   *     消息的类型，可取值为：`'info'`, `'success'`, `'warn'`, `'error'`, `'debug'`。
   * @param {string} message
   *     消息的内容，**支持HTML代码**。但**使用时要小心，防止XSS攻击**。
   * @param {object} options
   *     此对象的属性表示，消息框的其他选项，目前支持下述选项：
   *     - `position` {string} 消息的显示位置，可取值为：`'top-left'`, `'top-right'`,
   *       `'bottom-left'`, `'bottom-right'`。
   *     - `duration` {number} 消息显示的持续时间，单位为毫秒。设置为`0`表示永久显示。
   *     - `icon` {string} 自定义的消息图标，如不提供则使用`type`参数指定的默认图标。
   *     - `closeable` {boolean} 是否显示关闭消息按钮。
   *     - `closeAction` {function} 关闭消息按钮的点击处理函数。
   *     - `showDetail` {boolean} 是否显示详细信息按钮。
   *     - `detailLabel` {string} 详细信息按钮上的文本。
   *     - `detailAction` {function} 详细信息按钮的点击处理函数。
   */
  show(type, message, options = {}) {
    // 根据options中的类别，显示不同的图标和风格
    const iconColor = getQuasarColor(type);
    const args = {
      message,
      icon: options.icon ?? getQuasarIcon(type),
      iconColor,
      iconSize: '1.5em',
      html: true,
      position: options.position,
      timeout: options.duration,
      multiLine: false,
      color: 'white',
      textColor: 'black',
    };
    const noop = () => {};
    const closeButton = { label: '关闭', handler: options.closeAction ?? noop };
    const detailButton = { label: options.detailLabel, handler: options.detailAction ?? noop };
    if (options.showDetail && options.closeable) {
      args.actions = [detailButton, closeButton];
    } else if (options.showDetail) {
      args.actions = [detailButton];
    } else if (options.closeable) {
      args.actions = [closeButton];
    }
    this.Notify.create(args);
  }
}

export default QuasarNotifyImpl;
