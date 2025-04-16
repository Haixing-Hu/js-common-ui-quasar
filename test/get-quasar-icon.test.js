////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getQuasarIcon from '../src/impl/get-quasar-icon';
import getIconSetName from '../src/get-quasar-icon-set';

// Mock the common-ui functions and getIconSetName
jest.mock('@qubit-ltd/common-ui', () => ({
  getFontAwesomeIcon: jest.fn((type) => `fontawesome-${type}-icon`),
  getBootstrapIcon: jest.fn((type) => `bootstrap-${type}-icon`),
  getMaterialSymbolIcon: jest.fn((type) => `material-${type}-icon`),
}));

jest.mock('../src/get-quasar-icon-set', () => jest.fn());

describe('getQuasarIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return fontawesome icon when fontawesome icon set is used', () => {
    getIconSetName.mockReturnValue('fontawesome');

    const icon = getQuasarIcon('info');
    expect(icon).toBe('fontawesome-info-icon');
  });

  it('should return bootstrap icon when bootstrap icon set is used', () => {
    getIconSetName.mockReturnValue('bootstrap');

    const icon = getQuasarIcon('warn');
    expect(icon).toBe('bootstrap-warn-icon');
  });

  it('should return material icon when material icon set is used', () => {
    getIconSetName.mockReturnValue('material');

    const icon = getQuasarIcon('error');
    expect(icon).toBe('material-error-icon');
  });

  it('should default to material icon set when unknown icon set is provided', () => {
    getIconSetName.mockReturnValue('unknown');

    const icon = getQuasarIcon('success');
    expect(icon).toBe('material-success-icon');
  });

  it('should handle different message types', () => {
    getIconSetName.mockReturnValue('fontawesome');

    expect(getQuasarIcon('info')).toBe('fontawesome-info-icon');
    expect(getQuasarIcon('warn')).toBe('fontawesome-warn-icon');
    expect(getQuasarIcon('error')).toBe('fontawesome-error-icon');
    expect(getQuasarIcon('success')).toBe('fontawesome-success-icon');
    expect(getQuasarIcon('unknown')).toBe('fontawesome-unknown-icon');
  });
});
