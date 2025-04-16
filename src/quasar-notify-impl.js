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
   * 获取图标，如果未提供则使用默认图标
   * 
   * @param {string} type - 消息类型
   * @param {object} options - 选项对象
   * @returns {string|any} 图标
   * @private
   */
  _getIcon(type, options) {
    if (options.icon === undefined || options.icon === null) {
      return getQuasarIcon(type);
    }
    return options.icon;
  }

  /**
   * 获取处理函数，如果未提供则使用默认的无操作函数
   * 
   * @param {Function|undefined} handler - 可能的处理函数
   * @returns {Function} 处理函数
   * @private
   */
  _getHandler(handler) {
    const noop = () => {};
    
    if (handler === undefined || handler === null) {
      return noop;
    }
    
    return handler;
  }

  /**
   * 设置操作按钮
   *
   * @param {object} args - 通知参数对象
   * @param {object} options - 选项对象
   * @param {object} closeButton - 关闭按钮定义
   * @param {object} detailButton - 详情按钮定义
   * @private
   */
  _setActions(args, options, closeButton, detailButton) {
    if (!options.showDetail && !options.closeable) {
      // 既不显示详情按钮也不显示关闭按钮
      return;
    }
    
    if (options.showDetail && options.closeable) {
      // 同时显示详情按钮和关闭按钮
      args.actions = [detailButton, closeButton];
      return;
    }
    
    if (options.showDetail) {
      // 只显示详情按钮
      args.actions = [detailButton];
      return;
    }
    
    // 只显示关闭按钮
    args.actions = [closeButton];
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
  /* istanbul ignore next */
  show(type, message, options = {}) {
    // 根据options中的类别，显示不同的图标和风格
    const iconColor = getQuasarColor(type);
    
    // 获取图标
    /* istanbul ignore next */
    const icon = this._getIcon(type, options);
    
    const args = {
      message,
      icon,
      iconColor,
      iconSize: '1.5em',
      html: true,
      position: options.position,
      timeout: options.duration,
      multiLine: false,
      color: 'white',
      textColor: 'black',
    };
    
    // 获取关闭按钮和详情按钮的处理函数
    const closeHandler = this._getHandler(options.closeAction);
    const detailHandler = this._getHandler(options.detailAction);
    
    const closeButton = { label: '关闭', handler: closeHandler };
    const detailButton = { label: options.detailLabel, handler: detailHandler };
    
    // 设置操作按钮
    this._setActions(args, options, closeButton, detailButton);
    
    this.Notify.create(args);
  }
}

export default QuasarNotifyImpl;
