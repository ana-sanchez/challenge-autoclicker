import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import { logo } from '../styles/my-icons.js';
import { NormalizeCss } from '../styles/normalize.js';
import { getLogStatus, keyEnter } from '../data/constants.js';
import { checkInputUsername, inputIsEmpty } from '../service/helpers.js';
import { isUserSaved, removeData, saveCurrentUser, saveNewUser } from '../service/app-service.js';

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
        align-items: center;
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
    this.isLogged = getLogStatus();
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
          <button-default name="delete" label="Delete all users" size="small" ariaLabel="Join" @click="${() => this.deleteAllUsers()}" ?disabled="${!this.isLogged}"></button-default>
        </form>
      </main>
      <footer class="footer"><p>Powered by Ana Sánchez</p></footer>
    `;
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('keypress', (e) => {
      const press = e.keyCode || e.which;
      if(press === keyEnter) {
        this.validateData(e);
      }
    })
  }

  validateData(e) {
    e.preventDefault();
    if(checkInputUsername(this.user)) {
      this.shadowRoot.querySelector('input-default').setAttribute('isError', true);
      this.shadowRoot.querySelector('input-default').error = inputIsEmpty();
    } else if(!this.isLogged){
        saveNewUser(this.user, 0)
        .then(response => {
          if(response) {
            Router.go('/game');
          }
        })
      } else if(this.isLogged) {
        isUserSaved(this.user)
        .then(res => {
          if(res) {
            saveCurrentUser(this.user)
            Router.go('/game');
          } else {
            saveNewUser(this.user, 0)
            .then(user => {
              if(user) {
                Router.go('/game');
              }
            })
          }
        })
      }
  }

 async deleteAllUsers() {
    await removeData('user-db')
    localStorage.clear();
    this.shadowRoot.querySelector('button-default[name="delete"]').disabled = true;
    window.location.reload();
  }
}
customElements.define('login-component', LoginComponent);
