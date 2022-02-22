// Form warn messages
export const WarnMessages = {
  "warn-001": "This field is required.",
  "warn-002": "Please enter a valid username."
}

export function getLogStatus(){
  return parseInt(localStorage.getItem('LogStatus'), 10) === 200;
}

export function getCurrentUser(){
  return localStorage.getItem('current_user');
}
