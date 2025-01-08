////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 获取不同类型消息对应的 Quasar 调色盘颜色名称。
 *
 * @param {string} type
 *     消息类型。
 * @return {string}
 *     不同类型消息对应的 Quasar 调色盘颜色名称。
 */
function getQuasarColor(type) {
  switch (type) {
    case 'warn':
      return 'amber';
    case 'error':
      return 'red';
    case 'success':
      return 'green';
    case 'debug':
      return 'purple';
    case 'question':
      return 'light-blue';
    case 'info':
      return 'light-blue';
    default:
      return '#616161';
  }
}

export default getQuasarColor;
