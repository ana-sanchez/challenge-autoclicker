import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import { logo } from '../styles/my-icons.js';
import { NormalizeCss } from '../styles/normalize.js';
import { getLogStatus } from '../data/constants.js';
import { checkInputUsername, inputIsEmpty } from '../service/helpers.js';
import { isUserSaved, saveCurrentUser, saveNewUser } from '../service/app-service.js';

import '../UI/button-default.js';
import '../UI/input-default.js';

export class LoginComponent extends LitElement {
  static get properties() {
    return {
      user: {type: String},
      isLogged: {type:Boolean}
    };
  }

  static get styles() {
    return[
      NormalizeCss,
      css`
      :host {
        max-width: 360px;
        width: 100%;
        margin: auto;
        height: var(--app-height);
        font-family: var(--font);
        font-weight:700;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 100px 0;
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
        max-width:200px;
      }
      .header_title {
        font-size:1.125rem;
      }
      .form {
        display: flex;
        flex-direction: column;
      }
      .footer {
        position: fixed;
        bottom: 15px;
        font-size: .75rem;
        text-align: center;
        width: 100%;
      }
      button-default {
        margin-top: 30px
      }
    `
    ]
  }

  constructor() {
    super();
    this.isLogged = getLogStatus()
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
            @get-value="${(e) => {this.user = e.detail.value}}"
          ></input-default>
          <button-default label="Join" ariaLabel="Join" @click="${(e) => this.validateData(e)}"></button-default>
        </form>
      </main>
      <footer class="footer">Powered by Ana Sánchez</footer>
    `;
  }

  validateData(e) {
    e.preventDefault()
    if(checkInputUsername(this.user)) {
      this.shadowRoot.querySelector('input-default').setAttribute('isError', true);
      this.shadowRoot.querySelector('input-default').error = inputIsEmpty();
    } else if(this.isLogged && !isUserSaved(this.user)) { // Handle add current user
      saveCurrentUser(this.user);
      Router.go('/game');
    } else { // Handle new user
      saveNewUser(this.user, 0);
      Router.go('/game');
    }
  }
}
customElements.define('login-component', LoginComponent);
