import React from 'react';
import { render } from 'react-dom';
import AppRouter from './router';

import './main.scss';

const rootElement = document.getElementById('react-app');

render(<AppRouter />, rootElement);
