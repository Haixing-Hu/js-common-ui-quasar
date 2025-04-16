////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { IconSet } from 'quasar';
import getHtmlIcon from '../src/impl/get-html-icon';
import getIconSetName from '../src/get-quasar-icon-set';

// Mock getCssColor and icon-related functions
jest.mock('@qubit-ltd/common-ui', () => ({
  getCssColor: jest.fn((type) => {
    switch (type) {
      case 'info': return '#1976D2';
      case 'warn': return '#FF9800';
      case 'error': return '#C10015';
      case 'success': return '#21BA45';
      default: return '#616161';
    }
  }),
  getFontAwesomeIcon: jest.fn((type) => {
    switch (type) {
      case 'info': return 'fa-solid fa-circle-info';
      case 'warn': return 'fa-solid fa-triangle-exclamation';
      case 'error': return 'fa-solid fa-circle-xmark';
      case 'success': return 'fa-solid fa-circle-check';
      default: return 'fa-solid fa-circle-question';
    }
  }),
  getBootstrapIcon: jest.fn((type) => {
    switch (type) {
      case 'info': return 'bi bi-info-circle-fill';
      case 'warn': return 'bi bi-exclamation-triangle-fill';
      case 'error': return 'bi bi-x-circle-fill';
      case 'success': return 'bi bi-check-circle-fill';
      default: return 'bi bi-question-circle-fill';
    }
  }),
  getMaterialSymbolIcon: jest.fn((type) => {
    switch (type) {
      case 'info': return 'info';
      case 'warn': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'help';
    }
  }),
}));

// Mock getIconSetName
jest.mock('../src/get-quasar-icon-set', () => jest.fn());

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

describe('getHtmlIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct html icon for fontawesome icon set', () => {
    getIconSetName.mockReturnValue('fontawesome');

    const icon = getHtmlIcon('info');
    expect(icon).toBe('<i class="fa-solid fa-circle-info" style="font-size: 1.5em; color: #1976D2;"></i>');
  });

  it('should return correct html icon for bootstrap icon set', () => {
    getIconSetName.mockReturnValue('bootstrap');

    const icon = getHtmlIcon('warn');
    expect(icon).toBe('<i class="bi bi-exclamation-triangle-fill" style="font-size: 1.5em; color: #FF9800;"></i>');
  });

  it('should return correct html icon for material icon set', () => {
    getIconSetName.mockReturnValue('material');

    const icon = getHtmlIcon('error');
    const expectedStyle = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; font-size: 1.5em; color: #C10015;";
    expect(icon).toBe(`<i class="material-symbols-rounded" style="${expectedStyle}">error</i>`);
  });

  it('should default to material icon set when unknown icon set is provided', () => {
    getIconSetName.mockReturnValue('unknown');

    const icon = getHtmlIcon('success');
    const expectedStyle = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48; font-size: 1.5em; color: #21BA45;";
    expect(icon).toBe(`<i class="material-symbols-rounded" style="${expectedStyle}">check_circle</i>`);
  });
});
