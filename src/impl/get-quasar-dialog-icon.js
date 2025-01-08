////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  getFontAwesomeDialogIcon,
  getBootstrapIconDialogIcon,
  getMaterialSymbolDialogIcon,
} from '@qubit-ltd/common-ui';
import getIconSetName from '../get-quasar-icon-set';

/**
 * 获取不同类型对话框对应的图标。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的图标，以HTML代码形式表示。
 */
function getQuasarDialogIcon(type) {
  const iconSet = getIconSetName();
  switch (iconSet) {
    case 'fontawesome':
      return getFontAwesomeDialogIcon(type);
    case 'bootstrap':
      return getBootstrapIconDialogIcon(type);
    case 'material':
      return getMaterialSymbolDialogIcon(type);
    default:
      return getMaterialSymbolDialogIcon(type);
  }
}

export default getQuasarDialogIcon;
