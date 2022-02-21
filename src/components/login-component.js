import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import '../UI/button-default.js'
import '../UI/input-default.js'

import { logo } from '../styles/my-icons.js';
import {NormalizeCss} from '../styles/normalize.js';
import { isMandatoryError } from '../service/helpers.js';
import { saveUser } from '../service/app-service.js';

// const logo = new URL('../assets/images/logo.svg', import.meta.url).href;

export class LoginComponent extends LitElement {
  static get properties() {
    return {
      value: {type: String}
    };
  }

  static get styles() {
    return[
      NormalizeCss,
      css`
      :host {
        display: grid;
        padding: 100px 50px;
        place-content: center;
        max-width: 360px;
        margin: auto;
        box-sizing:border-box;
        font-family: "Chakra Bold", sans-serif;
      }
      .header {
        width:100%;
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 22px;
        font-size:1.313rem;
      }
      .header_logo {
        width: 100%;
      }
      .header_title {
        font-size:18px;
      }
      .form {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
      }
      button-default {
        margin-top: 30px
      }
    `
    ]
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header class="header">
        <span class="header_logo">${logo}</span>
        <h1 class="header_title">Create a new player</h1>
      </header>
      <main>
        <form name="check-user" class="form">
          <input-default label="Name*"
            @get-value="${(e) => {this.value = e.detail.value}}"
          ></input-default>
          <button-default label="Join" ariaLabel="Join"  @click="${() => this.validateData()}"></button-default>
        </form>
      </main>


    `;
  }

  validateData() {
    if(isMandatoryError(this.value)) {
      this.shadowRoot.querySelector('input-default').setAttribute('isError', true)
      this.shadowRoot.querySelector('input-default').error = isMandatoryError(this.value)
    } else {
      const user = this.value;
      localStorage.setItem('LogStatus', 200)
      localStorage.setItem('current_user', user)
      saveUser({user, count: 0})
      Router.go('/game')
    }
  }
}
customElements.define('login-component', LoginComponent);
