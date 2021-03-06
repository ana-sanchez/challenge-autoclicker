import { LitElement, html, css } from 'lit-element';
import { formatNumber } from '../service/helpers.js';
import { NormalizeCss } from '../styles/normalize.js';

export class CardRanking extends LitElement{
  static get properties(){
    return {
      user: {type: Object},
      autoclickers: {type: Number},
      megaclikers: {type: Number}
    }
  }

  static get styles() {
    return[
      NormalizeCss,
      css`
        .card {
          background-color: white;
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
          padding: 10px;
          border-radius: 4px;
          min-width: 150px;
        }
        .card_username {
          font-size: 21px;
          border-bottom: 2px solid;
          margin-bottom: 14px;
        }
        .card_cookies,
        .card_autoclickers,
        .card_megaclickers {
          font-size: .875rem;
          margin-bottom: 4px;
        }
    `
    ]
  }

  constructor(){
    super();
    this.user = {};
    this.autoclickers = 0;
    this.megaclikers = 0;
  }

  render() {
    return html`
      <div class="card">
        <h3 class="card_username">${this.user.user}</h3>
        <p class="card_cookies">Cookies: ${formatNumber(this.user.cookies)}</p>
        <p class="card_autoclickers">AutoClickiers: ${this.autoclickers}</p>
        <p class="card_megaclickers">MegaClickers: ${this.megaclikers}</p>
      </div>
      `;
  }


}

customElements.define('card-ranking', CardRanking);
