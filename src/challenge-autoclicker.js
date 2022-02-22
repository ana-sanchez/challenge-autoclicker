import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';
import { initializeApp } from 'firebase/app';

import  { config } from './data/config.js';

import './components/login-component.js';
import './components/game-component.js'

export class ChallengeAutoclicker extends LitElement {

  static get styles() {
    return css`
      :host {
        display:block;
        overflow: hidden;
        width:100%;
        box-sizing: border-box;
      }
      :root {
        --app-height: 100%;
      }
      #outlet{
        background-color: var(--bg_color);
        height: var(--app-height);
      }
    `;
  }

  render() {
    return html`
      <div id="outlet"></div>
    `;
  }

  firstUpdated() {

    // Setting App height for devices based on window's inner height
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    }

    window.addEventListener('resize', appHeight);
    appHeight();

    initializeApp(config.firebaseConfig);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then( (reg) => {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', reg.scope);
      }, (err) => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }

    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      { path: '/', component: 'login-component' },
      { path: '/game', component: 'game-component' },
      {
        path: '(.*)',
        redirect: '/',
      }
    ])
  }
}
customElements.define('challenge-autoclicker', ChallengeAutoclicker);
