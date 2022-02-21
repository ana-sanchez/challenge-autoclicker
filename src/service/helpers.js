import {WarnMessages} from '../data/constants.js'

export const isMandatoryError = (value) => {
  if(!value) return WarnMessages['warn-001']
}
