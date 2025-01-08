////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { Dialog } from 'quasar';
import { ConfirmImpl } from '@qubit-ltd/common-ui';
import getQuasarDialogIcon from './impl/get-quasar-dialog-icon';

/**
 * 基于Quasar框架实现的{@link ConfirmImpl}。
 *
 * @author 胡海星
 */
class QuasarConfirmImpl extends ConfirmImpl {
  /**
   * 显示一个弹出式确认对话框。
   *
   * @param {string} type
   *     可选参数，表示对话框的消息类型。
   * @param {string} title
   *     对话框的标题。
   * @param {string} message
   *     对话框中的文字内容。
   * @param {string} okLabel
   *     可选参数，表示确认按钮的文字，默认值为`'确认'`。
   * @param {string} cancelLabel
   *     可选参数，表示放弃按钮的文字，默认值为`'取消'`。
   * @return {Promise<void>}
   *     一个`Promise`对象，当用户点击对话框的确认按键后，则Promise resolve，可以接着
   *     `then`继续下一步操作；当用户点击对话框的放弃按键后，则Promise reject，可以接着
   *     `catch`继续下一步操作。如果此对象被禁用，则返回一个`rejected`状态的`Promise`对象。
   */
  show(type, title, message, okLabel, cancelLabel) {
    // 根据options中的类别，显示不同的图标和风格
    const icon = getQuasarDialogIcon(type);
    return new Promise((resolve, reject) => {
      Dialog.create({
        title: `${icon} ${title}`,
        message,
        ok: okLabel,
        cancel: cancelLabel,
        noEscDismiss: true,
        noBackdropDismiss: true,
        noRouteDismiss: false,
        seamless: false,
        html: true,
      }).onOk(resolve).onCancel(reject);
    });
  }
}

export default QuasarConfirmImpl;
