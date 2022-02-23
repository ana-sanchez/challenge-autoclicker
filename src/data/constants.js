
export const logStatus = 200;
export const keyEnter = 13;
export const timeoutGame = 100;
export const timeoutAnimations = 100;

// Form warn messages
export const WarnMessages = {
  "warn-001": "This field is required.",
  "warn-002": "Please enter a valid username."
}

export function getLogStatus(){
  return parseInt(localStorage.getItem('LogStatus')) === logStatus;
}

export function getCurrentUser(){
  return localStorage.getItem('current_user');
}
