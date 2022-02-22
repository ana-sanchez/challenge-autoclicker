import { WarnMessages } from '../data/constants.js'

export const checkInputUsername = (value) => !value;

export const inputIsEmpty = () => WarnMessages['warn-001'];

export const checkCookies = (count, autoclickerCost) => count >= autoclickerCost;
