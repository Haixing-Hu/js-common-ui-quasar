////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import {
  getFontAwesomeIcon,
  getBootstrapIcon,
  getMaterialSymbolIcon,
} from '@qubit-ltd/common-ui';
import getIconSetName from '../get-quasar-icon-set';

/**
 * 获取不同类型对话框对应的 Quasar 图标，以 Q-Icon 的名称表示。
 *
 * @param {string} type
 *     对话框类型。
 * @return {string}
 *     对应的图标，以 Q-Icon 的名称表示。
 */
function getQuasarIcon(type) {
  const iconSet = getIconSetName();
  switch (iconSet) {
    case 'fontawesome':
      return getFontAwesomeIcon(type);
    case 'bootstrap':
      return getBootstrapIcon(type);
    case 'material':
    default:
      return getMaterialSymbolIcon(type);
  }
}

export default getQuasarIcon;
