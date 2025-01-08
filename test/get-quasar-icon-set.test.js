////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IconSet } from 'quasar';
import { getQuasarIconSetName } from '../src';

jest.mock('quasar', () => ({
  IconSet: {
    props: {
      name: '',
    },
  },
}));

describe('getQuasarIconSetName', () => {
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
    IconSet.props.name = 'ionicons-v4';
    expect(getQuasarIconSetName()).toBe('ionicons');
  });

  it('should return "line-awesome" for line-awesome', () => {
    IconSet.props.name = 'line-awesome';
    expect(getQuasarIconSetName()).toBe('line-awesome');
  });

  it('should return "material" for material-icons-*', () => {
    IconSet.props.name = 'material-icons-v3';
    expect(getQuasarIconSetName()).toBe('material');
  });

  it('should return "material" for material-symbols-*', () => {
    IconSet.props.name = 'material-symbols-v3';
    expect(getQuasarIconSetName()).toBe('material');
  });

  it('should return "mdi" for mdi-icons-*', () => {
    IconSet.props.name = 'mdi-icons-v2';
    expect(getQuasarIconSetName()).toBe('mdi');
  });

  it('should return "themify" for themify-icons', () => {
    IconSet.props.name = 'themify-icons';
    expect(getQuasarIconSetName()).toBe('themify');
  });

  it('should return the original name if no match is found', () => {
    IconSet.props.name = 'unknown-icons';
    expect(getQuasarIconSetName()).toBe('unknown-icons');
  });
});
