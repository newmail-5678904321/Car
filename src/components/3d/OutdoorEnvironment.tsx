import React from 'react';
import { OutdoorLocation } from '../../types';
import { AlpineRoadEnvironment } from './AlpineRoadEnvironment';
import { SunsetValleyEnvironment } from './SunsetValleyEnvironment';
import { CoastalHighwayEnvironment } from './CoastalHighwayEnvironment';
import { CityNightEnvironment } from './CityNightEnvironment';
import { ForestPassEnvironment } from './ForestPassEnvironment';

interface OutdoorEnvironmentProps {
  location?: OutdoorLocation;
}

export const OutdoorEnvironment: React.FC<OutdoorEnvironmentProps> = ({ location = 'ALPINE' }) => {
  switch (location) {
    case 'SUNSET':
      return <SunsetValleyEnvironment />;
    case 'COASTAL':
      return <CoastalHighwayEnvironment />;
    case 'CITY_NIGHT':
      return <CityNightEnvironment />;
    case 'FOREST':
      return <ForestPassEnvironment />;
    case 'ALPINE':
    default:
      return <AlpineRoadEnvironment />;
  }
};
