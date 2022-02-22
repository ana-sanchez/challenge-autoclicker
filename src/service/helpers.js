import { WarnMessages } from '../data/constants.js'

export const checkInputUsername = (value) => !value;

export const inputIsEmpty = () => WarnMessages['warn-001'];

export const checkCookies = (count, autoclickerCost) => count >= autoclickerCost;

export const formatNumber = (num) => Math.abs(num) > 999 ? `${Math.sign(num)*((Math.abs(num)/1000).toFixed(1))} k` : Math.sign(num)*Math.abs(num)
