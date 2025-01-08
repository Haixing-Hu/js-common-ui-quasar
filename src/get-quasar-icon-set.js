////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IconSet } from 'quasar';

/**
 * 获取当前Quasar使用的图标集。
 *
 * @return
 *    当前Quasar使用的图标集的标准名称。
 * @author 胡海星
 */
function getIconSetName() {
  const name = IconSet?.props?.name;
  if (!name) {
    return '';
  } else if (name.startsWith('bootstrap-icons')) {
    return 'bootstrap';
  } else if (name.startsWith('eva-icons')) {
    return 'eva';
  } else if (name.startsWith('fontawesome')) {
    return 'fontawesome';
  } else if (name.startsWith('ionicons')) {
    return 'ionicons';
  } else if (name.startsWith('line-awesome')) {
    return 'line-awesome';
  } else if (name.startsWith('material-')) {
    return 'material';
  } else if (name.startsWith('mdi-')) {
    return 'mdi';
  } else if (name.startsWith('themify')) {
    return 'themify';
  } else {
    return name;
  }
}

export default getIconSetName;
