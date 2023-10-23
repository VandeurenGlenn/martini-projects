import 'custom-pages'
import './../custom-carousel.js'
import { css, html, LitElement } from 'lit'
import { map } from 'lit/directives/map.js'

export default customElements.define('home-view', class HomeView extends LitElement {
  constructor() {
    super()
  }

  static get properties() {
    return {
      carouselImages: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback()
    this.carouselImages = [
      './assets/rolpoort-banner.webp',
      './assets/insectenwering-banner.webp',
      './assets/zonwering-banner.webp',
      './assets/heaters-banner.webp',
      './assets/brievenbus-banner.webp',
      './assets/rolluiken-banner.webp'
    ]
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow-y: auto;
    }

    video {
      max-width: 1200px;
      width: 100%;
      box-sizing: border-box;

      display: inline-flex;
      object-fit: cover;
    }

    custom-carousel {
      display: inline-flex;
    }
    .product-item {
      width: calc(50% - 3px);
    }
  `

  render() {
    return html`
      <custom-carousel images="${JSON.stringify(this.carouselImages)}">
      </custom-carousel>

      <!-- <video src="./assets/martini-projects.mp4" loading="lazy"></video>-->

      <flex-row class="section-header">
        <h4>onze producten</h4>
      </flex-row>

      <flex-wrap-evenly>
        ${map(this.products, item => html`
          <flex-colum class="product-item" @click="${() => location.hash = `#!/${item.route}`}">
          <h5>${item.name}</h5>
          </flex-colum>
        `)}
      </flex-wrap-evenly>
    `
  }
})