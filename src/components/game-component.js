import { LitElement, html, css } from 'lit-element';

import { getCurrentUser, getDataByName, setData } from '../service/app-service.js';
import { cookie } from '../styles/my-icons.js';
import {NormalizeCss} from '../styles/normalize.js';

import '../UI/header-primary.js'

export class GameComponent extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
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
        padding: 60px 0;
      }
      .main_btn {
        width:100%;
        max-width:300px;
        margin: 20px auto 0 auto;
        animation: rotate infinite 20s linear;
        cursor:pointer;
      }
      .scale {
        animation: scale 0.2s ease-in;
      }
      .footer {
        position: fixed;
        bottom: 15px;
        font-size: .75rem;
        text-align: center;
        width: 100%;
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
    this.user = getCurrentUser()
  }

  render() {
    return html`
    <div class="wrapper">
      <header-primary></header-primary>
      <main class="main">
        <p class="main_score">${this.setCookies(this.count)}</p>
        <button type="button" title="Click me" class="main_btn" aria-label="Click me to add a cookie" aria-labelledby="Click me to add a cookie" @click="${() => {this.handleGame()}}">${cookie}</button>
      </main>
      <footer class="footer">Powered by Ana Sánchez</footer>
    </div>

    `;
  }

  onAfterEnter() {
    if(this.user)  {
      getDataByName(`${this.user}`, 'user-db','user' )
      .then(res => {
        if(res) {
          this.count = res.count;
        }
      })
    }

  }

  handleGame() {
    this.count += 1;
    this.addAnimationBnt()
    this.saveUserProgress()
    this.requestUpdate()
  }

  addAnimationBnt() {
    this.shadowRoot.querySelector('.main_btn').classList.add('scale')
    setTimeout(() => { this.shadowRoot.querySelector('.main_btn').classList.remove('scale') }, 100);
  }

  setCookies(count) {
    return html `
      ${count === 1 ? html `${count} cookie` : html `${count} cookies`}
    `
  }

  saveUserProgress() {
    getDataByName(`${this.user}`, 'user-db','user' )
    .then(res => {
      if(res.user === this.user) {
        res.count = this.count;
        setData(res, 'user-db', 'user', )
      }
    })
  }
}
customElements.define('game-component', GameComponent);
