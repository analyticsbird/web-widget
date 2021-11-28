/* eslint-disable import/prefer-default-export */
import React from 'react';
import { IConfig } from '../config/interfaces';

export const ConfigContext = React.createContext<IConfig>({ appId: '' });
