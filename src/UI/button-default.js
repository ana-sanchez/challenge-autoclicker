import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import {NormalizeCss} from "../styles/normalize.js";



export class ButtonDefault extends LitElement{
  static get properties(){
    return {
      label: {type: String},
      ariaLabel: {type: String},
      disabled: {type: Boolean}

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
    `
    ]
  }

  constructor(){
    super();
    this.label="Button default";
    this.ariaLabel="Button default"
  }

  render() {
    return html`
    ${this.disabled
      ? html `<button type="button" aria-label="${this.ariaLabel}" aria-labelledby="${this.ariaLabel}" class="button-default" disabled>${this.label}</button>`
      : html `<button type="button" aria-label="${this.ariaLabel}" aria-labelledby="${this.ariaLabel}" class="button-default">${this.label}</button>`}

  `;
  }



}

customElements.define('button-default', ButtonDefault);
