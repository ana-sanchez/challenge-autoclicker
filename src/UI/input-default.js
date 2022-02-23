import { LitElement, html, css } from 'lit-element';

import { NormalizeCss } from '../styles/normalize.js';

export class InputDefault extends LitElement{
  static get properties(){
    return {
      ariaLabel: {type: String},
      disabled: {type: Boolean},
      error: {type: String},
      isError: {type: Boolean},
      label: {type: String}
    }
  }

  static get styles() {
    return[
      NormalizeCss,
      css`

      .fieldset {
        display: flex;
        flex-direction: column;
        gap:4px;
      }
      .fieldset_label {
        color: rgb(80, 80, 80);
        font-family: var(--font);
        font-size: 1rem;
        display: block;
        width: fit-content;
        text-align: center;
        transform: translate3d(7px, 33px, 0px);
        transition: all 0.2s ease-in-out;
      }
      .fieldset_label.focus {
        font-family: var(--font);
        font-weight:700;
        transform: translate3d(7px, 12px, 10px);
        background-color: var(--bg_color);
        padding:0 10px;
      }
      .fieldset_input {
        width: 200px;
        background: unset;
        border-radius: 6px;
        border: 1px solid rgb(184, 120, 80);
        box-shadow: rgb(0 0 0 / 14%) 0px 3px 1px -2px, rgb(0 0 0 / 7%) 0px 2px 2px 0px, rgb(0 0 0 / 4%) 0px 1px 5px 0px;
        cursor: pointer;
        padding: 0 10px;
        color: rgb(55 25 7);
        font-size: .875rem;
        height:40px;
      }
      .fieldset_input.isError {
        border: 1px solid var(--danger);
      }
      .fieldset_input:focus {
        border: 1px solid rgb(223 148 101);
      }
      .fieldset_label.focus {
        font-family: var(--font);
        font-weight: 700;
      }
      .fieldset_input:disabled {
        color: rgba(0, 0, 0, 0.26);
        box-shadow: none;
        background-color: rgba(0, 0, 0, 0.12);
        cursor: not-allowed;
      }
      .fieldset_input::placeholder {
        color:transparent;
      }
      .fieldset_error {
        color: var(--danger);
        font-size:.75rem;
      }
    `
    ]
  }

  get inputElement() {
    if(!this._inputElement) {
      this._inputElement = this.shadowRoot.querySelector('.fieldset_input');
    }
    return this._inputElement;
}

  render() {
    const {label, isError, error} = this
    return html`
    <fieldset class="fieldset">
      <label for="input-default" class="fieldset_label" aria-label="${label}" aria-labelledby="${label}" @click="${() => this.initInputFocus()}" >${label}</label>
      <input type="text" name="input-default" aria-label="Login" aria-labelledby="Login" maxlength="10" placeholder="User" class="fieldset_input ${isError ? 'isError' : ''}"
        @keyup="${() => this.handleKeyUp()}"
        @focus="${() => this.handleFocus()}"
        @focusout="${() => this.handleFocusout()}"
      />
      ${isError ? html `<p class="fieldset_error">${error}</p>` : ''}
    </fieldset>
  `;
  }

  initInputFocus() {
    if(this._inputElement ){
      this._inputElement.focus();
    } else {
      this.shadowRoot.querySelector('input[name="input-default"]').focus();
    }
  }

  handleKeyUp() {
    const { value } = this.inputElement;
    this.dispatchEvent(new CustomEvent('get-value', {composed: true, bubbles: true, detail: { value }}));
  }

  handleFocus() {
    this.shadowRoot.querySelector('.fieldset_label')?.classList.add('focus');
    if(this.isError) {
      this.isError = false;
    }
  }

  handleFocusout() {
    const label = this.shadowRoot.querySelector('.fieldset_label');
    if(label.classList.contains('focus') && !this.inputElement.value) {
      label.classList.remove('focus')
    }
  }
}

customElements.define('input-default', InputDefault);
