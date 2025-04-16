////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IconSet } from 'quasar';
import getQuasarIconSetName from '../src/get-quasar-icon-set';

jest.mock('quasar', () => ({
  IconSet: {
    props: {
      name: '',
    },
    set: function setFn(props) {
      this.props = { ...this.props, ...props };
    },
  },
}));

describe('getQuasarIconSetName', () => {
  // 保存原始的 IconSet.props.name 值
  const originalName = IconSet.props.name;

  beforeEach(() => {
    // 每个测试前重置为初始值
    IconSet.props.name = '';
  });

  afterAll(() => {
    // 测试结束后恢复原始值
    IconSet.props.name = originalName;
  });

  it('should return empty string when IconSet is undefined', () => {
    // 模拟 IconSet 为 undefined
    const originalIconSet = global.IconSet;
    global.IconSet = undefined;
    expect(getQuasarIconSetName()).toBe('');
    global.IconSet = originalIconSet;
  });

  it('should return empty string when IconSet.props is undefined', () => {
    // 模拟 IconSet.props 为 undefined
    const originalProps = IconSet.props;
    IconSet.props = undefined;
    expect(getQuasarIconSetName()).toBe('');
    IconSet.props = originalProps;
  });

  it('should return empty string when IconSet.props.name is empty', () => {
    IconSet.props.name = '';
    expect(getQuasarIconSetName()).toBe('');
  });

  it('should return "bootstrap" for bootstrap-icons', () => {
    IconSet.props.name = 'bootstrap-icons';
    expect(getQuasarIconSetName()).toBe('bootstrap');
  });

  it('should return "eva" for eva-icons', () => {
    IconSet.props.name = 'eva-icons';
    expect(getQuasarIconSetName()).toBe('eva');
  });

  it('should return "fontawesome" for fontawesome-*', () => {
    IconSet.props.name = 'fontawesome-v6';
    expect(getQuasarIconSetName()).toBe('fontawesome');
  });

  it('should return "ionicons" for ionicons-*', () => {
    IconSet.props.name = 'ionicons-v5';
    expect(getQuasarIconSetName()).toBe('ionicons');
  });

  it('should return "line-awesome" for line-awesome', () => {
    IconSet.props.name = 'line-awesome';
    expect(getQuasarIconSetName()).toBe('line-awesome');
  });

  it('should return "material" for material-icons-*', () => {
    IconSet.props.name = 'material-icons';
    expect(getQuasarIconSetName()).toBe('material');
  });

  it('should return "material" for material-symbols-*', () => {
    IconSet.props.name = 'material-symbols';
    expect(getQuasarIconSetName()).toBe('material');
  });

  it('should return "mdi" for mdi-icons-*', () => {
    IconSet.props.name = 'mdi-icons';
    expect(getQuasarIconSetName()).toBe('mdi');
  });

  it('should return "themify" for themify-icons', () => {
    IconSet.props.name = 'themify-icons';
    expect(getQuasarIconSetName()).toBe('themify');
  });

  it('should return the original name if no match is found', () => {
    IconSet.props.name = 'unknown-icon-set';
    expect(getQuasarIconSetName()).toBe('unknown-icon-set');
  });
});
