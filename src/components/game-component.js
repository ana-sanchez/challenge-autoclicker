/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import { NormalizeCss } from '../styles/normalize.js';
import { cookie } from '../styles/my-icons.js';

import { checkCookies, formatNumber } from '../service/helpers.js';
import { timeoutGame, timeoutAnimations, getCurrentUser } from '../data/constants.js';
import { getDataByName, saveUserProgress } from '../service/app-service.js';

import '../UI/header-primary.js';

export class GameComponent extends LitElement {
  static get properties() {
    return {
      autoClickerCost: {type: Array},
      cookies: { type: Number},
      cookiesCost: {type: Array},
      progress: {type: Array},
      user: {type: String}
    };
  }

  static get styles() {
    return [
      NormalizeCss,
      css`
      :host {
        max-width: 360px;
        width:100%;
        margin: 0 auto;
        max-height: var(--app-height);
        overflow: hidden;
        user-select: none;
      }
      .wrapper {
        height: var(--app-height);
      }
      .main {
        max-width: 360px;
        width:100%;
        margin: 0 auto;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        gap:20px;
        padding: 20px 0;
      }
      .main_btn {
        width:100%;
        max-width:200px;
        margin: 20px auto 0 auto;
        animation: rotate infinite 20s linear;
        cursor:pointer;
      }
      .scale {
        animation: scale 0.2s ease-in;
      }
      .main_autoclikers {
        margin-top: 30px;
        display:flex;
        gap:10px;
      }
      .main_store {
        font-size:.75rem;
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes scale {
        0% {
          transform: scale(0.9);
        }
        50% {
          transform: scale(0.95);
        }
        100% {
          transform: scale(1);
        }
      }
    `
    ];
  }

  constructor() {
    super();
    this.user = getCurrentUser();
    this.cookies = 0;
    this.progress = [0,0,0];
    this.cookiesCost =[1,2,4];
    this.autoClickerCost = [100,200,400];
  }

  render() {
    return html`
    <div class="wrapper">
      <header-primary></header-primary>
      <main class="main">
        <p class="main_score"> Hi ${this.user}!</p>
        <p class="main_score">${this.setCookies(this.cookies)}</p>
        <button
          type="button"
          title="Click me"
          class="main_btn"
          aria-label="Click me to add a cookie"
          aria-labelledby="Click me to add a cookie"
          @click="${() => {this.addCookie()}}"
          @touchstart="${() => {this.addCookie()}}">${cookie}</button>
        <section class="main_autoclikers">
          <button-default
            size="small"
            label="Buy autoClickers"
            ?disabled="${!checkCookies(this.cookies, this.autoClickerCost[0])}"
            @click="${() => this.buyCookies(0)}"
            @touchstart="${() => this.buyCookies(0)}"></button-default>
          <button-default
            size="small"
            label="Buy megaClickers"
            ?disabled="${!checkCookies(this.cookies, this.autoClickerCost[1])}"
            @click="${() => this.buyCookies(1)}"
            @touchstart="${() => this.buyCookies(1)}"></button-default>
        </section>
        <section class="main_store">
          <p>Autoclickers: ${this.progress[0]}</p>
          <p>MegaClickers: ${this.progress[1]}</p>
        </section>
      </main>
    </div>
    `;
  }

  onBeforeEnter() {
    if(this.user) {
      getDataByName(`${this.user}`, 'user-db','user')
      .then(async res => {
        if(res) {
          this.cookies = res.cookies;
          this.progress = res.progress;
          this.requestUpdate()
          if(this.progress[0] >= 1 || this.progress[1] >= 1) {
            this._autoClickerInterval = setInterval(() => { this.handleAutoclickers() }, timeoutGame);
          }
        } else {
          Router.go('/')
        }
      })
    }
  }

  onBeforeLeave() {
    saveUserProgress(this.user, this.cookies, this.progress);
    if(this._autoClickerInterval) {
      clearInterval(this._autoClickerInterval)
    }
  }

  addCookie() {
    this.cookies += 1;
    this.addButtonAnimation();
    saveUserProgress(this.user, this.cookies, this.progress);
  }

  buyCookies(obj) {
    if(checkCookies(this.cookies, this.autoClickerCost[obj])) {
      this.progress[obj] += 1;
      this.cookies -= this.autoClickerCost[obj];
      this._autoClickerInterval = setInterval(() => { this.handleAutoclickers() }, timeoutGame);
    }
  }

  handleAutoclickers() {
    for(let count = 0; count < this.progress.length; count++) {
      this.cookies += this.progress[count] * this.cookiesCost[count];
    }
  }

  addButtonAnimation() {
    this.shadowRoot.querySelector('.main_btn').classList.add('scale');
    setTimeout(() => {
      this.shadowRoot.querySelector('.main_btn').classList.remove('scale');
    }, timeoutAnimations);
  }

  setCookies(count) {
    return html `${count === 1 ? html `${formatNumber(count)} cookie` : html `${formatNumber(count)} cookies`}`;
  }
}
customElements.define('game-component', GameComponent);
