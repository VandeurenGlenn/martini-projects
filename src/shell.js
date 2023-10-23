import { css, html, LitElement } from "lit";
import './elements/app/logo.js'
import '@vandeurenglenn/flex-elements'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import 'custom-pages'

const debang = (hash) => hash.split('#!/')[1]
const bang = (selected) => `#!/${selected}`

export default customElements.define('app-shell', class AppShell extends LitElement {
  constructor() {
    super()
    globalThis.onhashchange = this.#onHashChange.bind(this)
    if (!location.hash) this.select('home')
    else this.#onHashChange()
  }

  async #onHashChange() {
    const selected = debang(location.hash)
    console.log(selected);
    await this.#select(selected)
  }

  async #select(selected) {
    if (!customElements.get(`${selected}-view`)) await import(`./${selected}.js`)
    this.renderRoot.querySelector('custom-pages').select('selected')
  }

  async select(selected) {
    location.hash = bang(selected)
  }

  static styles = css`
    :host {
      display: flex;
      position: relative;
      height: 100%;
      width: 100%;
    }

    header {
      display: flex;
      padding: 12px 12px 12px 0;
      box-sizing: border-box;
      height: 110px;
      width: 100%;
      max-width: 1200px;
      align-items: flex-end;
      align-items: center;
    }

    app-logo {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }

    button {
      height: 44px;
      background: #111111;
      color: #fff;
      max-width: 140px;
      width: 100%;
      font-weight: 700;
      border: none;
      text-transform: capitalize;
    }

    button.offerte {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }

    flex-column.main {
      width: 100%;
      align-items: center;
    }

    custom-pages {
      width: 100%;
      max-width: 1200px;
    }

    aside {
      display: flex;
      flex-direction: column;
      top: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      width: 320px;
      background: #14161b;
      opacity: 0;
    }

    a {
      padding: 6px 12px;
      box-sizing: border-box;
      text-decoration: none;
      text-transform: uppercase;
      color: #fff;
    }

    aside button {
      height: 44px;
      background: #544d9d;
      color: #eee;
      max-width: 140px;
      width: 100%;
    }

    home-view {
      display: block !important;

    }

    @media(min-width: 1200px) {
      custom-svg-icon[icon="menu"] {
        opacity: 0;
        pointer-events: none;
      }
      flex-column.main {
        width: calc(100% - 320px);
        align-items: center;
      }
      aside {
        opacity: 1;
      }
    } 
  `

  render() {
    return html`
      <button class="offerte">gratis offerte</button>
      <flex-column class="main">
        <header>
          <app-logo logo="./assets/logo.svg" @click=${() => location.hash = '#!/home'}></app-logo>
          <flex-one></flex-one>
          
          <custom-svg-icon icon="menu"></custom-svg-icon>
        </header>

        <custom-pages>
          <home-view></home-view>
        </custom-pages>
      </flex-column>
      <aside>
        <a href="#!/home">home</a>
        <a href="#!/producten">producten</a>
        <a href="#!/services">services</a>

        <flex-one></flex-one>

        <button class="offerte">gratis offerte</button>
      </aside>
    `;
  }
})