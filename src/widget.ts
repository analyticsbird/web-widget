/* eslint-disable guard-for-in */
const defaultStyles: any = {
  border: 'none',
  'z-index': 99999999999999999,
  height: '650px',
  width: '350px',
  display: 'block !important',
  visibility: 'visible',
  background: 'none transparent',
  opacity: 1,
  'pointer-events': 'auto',
  'touch-action': 'auto',
  position: 'fixed',
  right: '20px',
  bottom: '20px',
};

interface IConfig {
  readonly appId: string;
}

interface IWidget {
  config: IConfig | null;
  iframe: HTMLIFrameElement | null;
  init: (config: IConfig) => void;
  setupListeners: () => void;
  createIframe: () => void;
  handleMessage: (event: MessageEvent) => void;
}

const Widget: IWidget = {
  iframe: null,
  config: null,
  init(config: IConfig) {
    this.config = config;
    this.createIframe();
  },
  createIframe() {
    this.iframe = document.createElement('iframe');
    let styles = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const key in defaultStyles) { styles += `${key}: ${defaultStyles[key]};`; }
    this.iframe.setAttribute('style', styles);
    this.iframe.src = 'http://localhost:9000';
    this.iframe.referrerPolicy = 'origin';
    document.body.appendChild(this.iframe);
    this.setupListeners();
  },
  setupListeners() {
    window.addEventListener('message', this.handleMessage.bind(this));
  },
  handleMessage(e) {
    e.preventDefault();
    if (!e.data || (typeof e.data !== 'string')) return;

    let data;

    try {
      data = JSON.parse(e.data);
    } catch {
      data = e.data;
    }

    const iframeInstance:any = this.iframe;

    switch (data.action) {
      case 'init': {
        if (this.iframe) {
          iframeInstance.contentWindow.postMessage(JSON.stringify(this.config), '*');
        }
        break;
      }
      default:
        break;
    }

    if (typeof data === 'string') {
      switch (data) {
        case 'message': {
          // eslint-disable-next-line no-unused-expressions
          // window.document.getElementsByTagName('body')[0].style.background = 'grey';
          break;
        }
        default:
          break;
      }
    }
  },
};

export default Widget;
