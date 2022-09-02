import { load, CURRENTFILMS_LOCALSTORAGE_KEY } from './storage/storage';
import { renderCards } from './renderCards';
import { onScroll, onToTopBtn } from './scroll';

export default class MyPagimation {
  constructor({
    cardContainer,
    paginationContainer,
    paginationContainerMobile,
    getNewFilm, //callback who  save sava data ('current film', lendth ) to local storege to render current page
  }) {
    this.tbody = document.querySelector(`.${cardContainer}`);
    this.paginationContainer = document.querySelector(
      `.${paginationContainer}`
    );
    this.paginationContainerMobile = document.querySelector(
      `.${paginationContainerMobile}`
    );

    this.datatableUsers = load(CURRENTFILMS_LOCALSTORAGE_KEY);
    this.callGoTo;
    this.callNextBtn;
    this.callPrevBtn;
    this.qwery;
    this.state = {
      currentNumPage: 0,
      postOnPerPage: 10,
      numOfPages: 0,
      numOfButtons: [],
    };

    this.getNewFilm = getNewFilm;
  }

  async inicialization() {
    this.reset();

    await this.getNewFilm(this.qwery, this.state.currentNumPage + 1);
    this.loadDataForRender();

    for (let i = 1; i <= this.state.numOfPages; i++) {
      this.state.numOfButtons.push(i);
    }
    this.render();
  }
  reset() {
    this.state.currentNumPage = 0;
    this.state.numOfButtons.length = 0;
    this.qwery = load('qwery');
  }
  loadDataForRender() {
    this.state.numOfPages = load(`total_pages`);
    this.qwery = load('qwery');
  }

  async goToPage(event) {
    if (event.target.dataset.action === '-1') {
      this.previusPage();
      return;
    }
    if (event.target.dataset.action === '+1') {
      this.nextPage();

      return;
    }

    if (Number(event.target.textContent)) {
      this.state.currentNumPage = Number(event.target.textContent) - 1;

      await this.getNewFilm(this.qwery, this.state.currentNumPage + 1);
      this.loadDataForRender();

      this.render();
    }
  }

  async nextPage() {
    this.state.currentNumPage += 1;

    if (this.state.currentNumPage > this.state.numOfPages - 1) {
      this.state.currentNumPage = this.state.numOfPages;
      return;
    }

    await this.getNewFilm(this.qwery, this.state.currentNumPage + 1);
    this.loadDataForRender();

    this.render();
  }

  async previusPage() {
    this.state.currentNumPage -= 1;
    if (this.state.currentNumPage < 0) {
      this.state.currentNumPage = 0;
      return;
    }

    await this.getNewFilm(this.qwery, this.state.currentNumPage + 1);
    this.loadDataForRender();

    this.render();
  }

  async render() {
    onScroll();
    onToTopBtn();
    if (this.callGoTo) {
      this.paginationContainer.removeEventListener('click', this.callGoTo);
      this.paginationContainerMobile.removeEventListener(
        'click',
        this.callGoTo
      );
    }

    const currentDataToRender = load(CURRENTFILMS_LOCALSTORAGE_KEY);
    const dataTable = await renderCards(currentDataToRender);
    const { navigation, navigationMobile } = this.paginationButtons();

    this.tbody.innerHTML = '';
    this.paginationContainer.innerHTML = '';
    this.paginationContainerMobile.innerHTML = '';

    this.tbody.insertAdjacentHTML('beforeend', dataTable);
    this.paginationContainer.insertAdjacentHTML('beforeend', navigation);
    this.paginationContainerMobile.insertAdjacentHTML(
      'beforeend',
      navigationMobile
    );

    this.callGoTo = this.goToPage.bind(this);
    this.paginationContainer.addEventListener('click', this.callGoTo);
    this.paginationContainerMobile.addEventListener('click', this.callGoTo);
  }

  paginationButtons() {
    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';
    const { currentNumPage, numOfPages, numOfButtons } = this.state;
    let HTMLNumberOfButtonsDesktop = [...numOfButtons];
    let HTMLNumberOfButtonsMobile = [...numOfButtons];

    const currentNumPage_1 = currentNumPage + 1;

    if (numOfButtons.length < 6) {
      HTMLNumberOfButtonsMobile = numOfButtons;
    } else if (currentNumPage_1 < 3) {
      const sliced1 = [1, 2, 3, 4, 5];
      const sliced2 = numOfButtons.slice(
        currentNumPage_1 + 2,
        currentNumPage_1 + 5
      );
      HTMLNumberOfButtonsMobile = [...sliced1];
    } else if (currentNumPage_1 > numOfButtons.length - 3) {
      const sliced1 = numOfButtons.slice(numOfButtons.length - 5);
      HTMLNumberOfButtonsMobile = [...sliced1];
    } else {
      const sliced1 = numOfButtons.slice(
        currentNumPage_1 - 3,
        currentNumPage_1
      );
      const sliced2 = numOfButtons.slice(
        currentNumPage_1,
        currentNumPage_1 + 2
      );
      HTMLNumberOfButtonsMobile = [...sliced1, ...sliced2];
    }

    if (numOfButtons.length < 10) {
      HTMLNumberOfButtonsDesktop = numOfButtons;
    } else if (currentNumPage_1 >= 1 && currentNumPage_1 <= 3) {
      const sliced = numOfButtons.slice(0, 7);
      HTMLNumberOfButtonsDesktop = [
        ...sliced,
        dotsInitial,
        numOfButtons.length,
      ];
    } else if (currentNumPage_1 === 4) {
      const sliced = numOfButtons.slice(0, 7);
      HTMLNumberOfButtonsDesktop = [
        ...sliced,
        dotsInitial,
        numOfButtons.length,
      ];
    } else if (
      currentNumPage_1 > 4 &&
      currentNumPage_1 < numOfButtons.length - 2
    ) {
      // from 5 to 8 -> (10 - 2)
      const sliced1 = numOfButtons.slice(
        currentNumPage_1 - 3,
        currentNumPage_1
      );
      // sliced1 (5-2, 5) -> [4,5]
      const sliced2 = numOfButtons.slice(
        currentNumPage_1,
        currentNumPage_1 + 2
      );
      // sliced1 (5, 5+1) -> [6]
      HTMLNumberOfButtonsDesktop = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numOfButtons.length,
      ];
      // [1, '...', 4, 5, 6, '...', 10]
    } else if (currentNumPage_1 > numOfButtons.length - 4) {
      // > 7
      const sliced = numOfButtons.slice(numOfButtons.length - 7);
      // slice(10-4)
      HTMLNumberOfButtonsDesktop = [1, dotsLeft, ...sliced];
    }

    const prevBTN = `    <li  class= "dt-item 
                    ${
                      currentNumPage_1 === 1 ? 'disabled' : ''
                    }" data-action ="-1"
                      >
                        <a class="dt-link js-next-page"data-action="-1">
                          
                        </a>
                      </li>`;
    const nextBTN = `    <li class="dt-item  
                    ${
                      currentNumPage_1 === numOfButtons.length ? 'disabled' : ''
                    }" data-action ="+1"
                      >
                        <a class="dt-link" data-action="+1">
                          
                        </a>
                      </li>`;
    const result = HTMLNumberOfButtonsDesktop.map(btn => {
      return `
                      <li class= "dt-item 
                      ${this.state.currentNumPage === btn - 1 ? 'active' : ''}">
                        <a class="dt-link">
                          ${btn}
                        </a>
                      </li>
`;
    }).join('');

    const resultMobile = HTMLNumberOfButtonsMobile.map(btn => {
      return `
             <li class= "dt-item ${
               this.state.currentNumPage === btn - 1 ? 'active' : ''
             }">
                        <a class="dt-link">
                          ${btn}
                        </a>
                      </li>
`;
    }).join('');

    if (HTMLNumberOfButtonsDesktop.length === 0) {
      return {
        navigation: '',
        navigationMobile: '',
      };
    }
    return {
      navigation: [prevBTN, result, nextBTN].join(''),
      navigationMobile: [prevBTN, resultMobile, nextBTN].join(''),
    };
  }
}
