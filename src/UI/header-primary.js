import { LitElement, html, css } from 'lit-element';
import { Router } from '@vaadin/router';

import { NormalizeCss } from '../styles/normalize.js';

export class HeaderPrimary extends LitElement{

  static get styles() {
    return [
      NormalizeCss,
      css`
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px 10px 20px 20px;
        max-width: 600px;
        width: 100%;
        margin: 0px auto;
        border-bottom: 1px solid rgb(206, 200, 200);
      }
      .header_title {
        width:100%;
        font-size:1.313rem;
        color: var(--black);
        font-family: var(--font_bold);
      }
      .header_btn {
        border:1px solid var(--brown);
        border-radius: 2px;
      }

      `
    ]
  }

  render() {
    return html`
      <header class="header">
        <h2 class="header_title">Cookie clicker</h2>
        <button type="button" aria-label="Go to login" aria-labelledby="Go to login" class="header_btn" @click="${() => this.goToLogin()}">Exit</p>
      </header>
    `;
  }

  goToLogin() {
    Router.go('/');
  }
}

customElements.define('header-primary', HeaderPrimary);
