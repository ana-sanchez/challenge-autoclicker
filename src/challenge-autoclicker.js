import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

import './components/login-component'
// const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

export class ChallengeAutoclicker extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--challenge-autoclicker-background-color);
        display: block;
        padding: 24px;
        width: 100%;
        min-height: var(--app-height);
        overflow:visible;
      }

      :root {
        --app-height: 100%;
      }

      #outlet{
        background-color: #f0f1f2;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Challenge autoclicker';
  }

  render() {
    return html`
    <div id="outlet"></div>
    <p>hola</p>
    `;
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      { path: '/', component: 'login-component' },
      {
        path: '(.*)',
        redirect: '/',
      }
    ])
  }
}
customElements.define('challenge-autoclicker', ChallengeAutoclicker);
