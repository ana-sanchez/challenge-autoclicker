import { LitElement, html, css } from 'lit-element';
import { NormalizeCss } from '../styles/normalize.js';

export class ButtonDefault extends LitElement{
  static get properties(){
    return {
      ariaLabel: {type: String},
      disabled: {type: Boolean},
      label: {type: String},
      size: {type: String}
    }
  }

  static get styles() {
    return[
      NormalizeCss,
      css`
        .button-default {
          width: 200px;
          height: 45px;
          background: rgb(114 75 50);
          border-radius: 6px;
          color:white;
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
          cursor:pointer;
          font-family: "Chakra Bold", sans-serif;
        }
        .button-default:disabled {
          color: rgba(0, 0, 0, 0.26);
          box-shadow: none;
          background-color: rgba(0, 0, 0, 0.12);
          cursor: not-allowed;
        }
        .button-default.small {
          height: 30px;
          font-size: .75rem;
          border-radius:17px;
          width:fit-content;
        }
    `
    ]
  }

  constructor(){
    super();
    this.label = "Button default";
    this.ariaLabel = "Button default";
    this.disabled = false;
  }

  render() {
    return html`
      <button
        type="button"
        aria-label="${this.ariaLabel}"
        aria-labelledby="${this.ariaLabel}"
        class="button-default ${this.size ? 'small' : ''}"
        ?disabled="${this.disabled}">${this.label}</button>
      `;
  }





}

customElements.define('button-default', ButtonDefault);
