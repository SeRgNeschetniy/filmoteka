import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';
import { getNewMovi, createMovieCards } from '../index';
import { renderCards } from './renderCards';

export default class MyPagimation {
  constructor({ cardContainer, paginationContainer, mobileDots }) {
    this.tbody = document.querySelector(`.${cardContainer}`);
    this.paginationContainer = document.querySelector(
      `.${paginationContainer}`
    );
    this.datatableUsers = load(CURRENTFILMS_LOCALSTORAGE_KEY);
    this.mobileDots = mobileDots;
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
  }

  async inicialization() {
    this.reset();
    await getNewMovi(this.qwery, this.state.currentNumPage + 1);
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
    // console.log(Number(event.target.textContent));
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
      await getNewMovi(this.qwery, this.state.currentNumPage + 1);
      this.loadDataForRender();

      this.render();
    }
  }

  getMovisPerPage(num) {
    console.log(`page ${num}`);
    // await getNewMovi(page);
  }
  async nextPage() {
    // console.log(this);

    this.state.currentNumPage += 1;

    if (this.state.currentNumPage > this.state.numOfPages - 1) {
      this.state.currentNumPage = this.state.numOfPages;
      return;
    }
    // this.getMovisPerPage(this.state.currentNumPage);
    await getNewMovi(this.qwery, this.state.currentNumPage + 1);
    this.loadDataForRender();

    this.render();
  }

  async previusPage() {
    this.state.currentNumPage -= 1;
    if (this.state.currentNumPage < 0) {
      this.state.currentNumPage = 0;
      return;
    }
    await getNewMovi(this.qwery, this.state.currentNumPage + 1);
    this.loadDataForRender();

    this.render();
  }

  render() {
    if (this.callGoTo) {
      this.paginationContainer.removeEventListener('click', this.callGoTo);
    }

    const currentDataToRender = load(CURRENTFILMS_LOCALSTORAGE_KEY);
    const dataTable = renderCards(currentDataToRender);
    const navigation = this.paginationButtons();

    this.tbody.innerHTML = '';
    this.paginationContainer.innerHTML = '';

    this.tbody.insertAdjacentHTML('beforeend', dataTable);
    this.paginationContainer.insertAdjacentHTML('beforeend', navigation);
    this.paginationContainer.removeEventListener(
      'click',
      this.goToPage.bind(this)
    );
    this.callGoTo = this.goToPage.bind(this);
    this.paginationContainer.addEventListener('click', this.callGoTo);
  }

  paginationButtons() {
    // this.state.numOfPages = load(`total_pages`);

    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';
    const { currentNumPage, numOfPages, numOfButtons } = this.state;
    let tempNumberOfButtons = [...numOfButtons];
    const currentNumPage_1 = currentNumPage + 1;

    if (this.mobileDots === true) {
      if (numOfButtons.length < 6) {
        tempNumberOfButtons = numOfButtons;
      } else if (currentNumPage_1 < 3) {
        const sliced1 = [1, 2, 3, 4, 5];
        const sliced2 = numOfButtons.slice(
          currentNumPage_1 + 2,
          currentNumPage_1 + 5
        );
        // sliced1 (5, 5+1) -> [6]
        tempNumberOfButtons = [...sliced1];
      } else if (currentNumPage_1 > numOfButtons.length - 3) {
        const sliced1 = numOfButtons.slice(numOfButtons.length - 5);
        tempNumberOfButtons = [...sliced1];
      } else {
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
        tempNumberOfButtons = [...sliced1, ...sliced2];
      }
    } else {
      if (numOfButtons.length < 10) {
        tempNumberOfButtons = numOfButtons;
      } else if (currentNumPage_1 >= 1 && currentNumPage_1 <= 3) {
        const sliced = numOfButtons.slice(0, 7);
        tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
      } else if (currentNumPage_1 === 4) {
        const sliced = numOfButtons.slice(0, 7);
        tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length];
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
        tempNumberOfButtons = [
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
        tempNumberOfButtons = [1, dotsLeft, ...sliced];
      }
    }
    console.log(tempNumberOfButtons);
    const prevBTN = `    <li  class= "dt-item ${
      currentNumPage_1 === 1 ? 'disabled' : ''
    }" data-action ="-1"
                      >
                        <a class="dt-link js-next-page"data-action="-1">
                          Prev
                        </a>
                      </li>`;
    const nextBTN = `    <li class="dt-item  ${
      currentNumPage_1 === numOfButtons.length ? 'disabled' : ''
    }" data-action ="+1"
                      >
                        <a class="dt-link" data-action="+1">
                          Next
                        </a>
                      </li>`;
    const result = tempNumberOfButtons
      .map(btn => {
        return `
             <li class= "dt-item ${
               this.state.currentNumPage === btn - 1 ? 'active' : ''
             }">
                        <a class="dt-link">
                          ${btn}
                        </a>
                      </li>
`;
      })
      .join('');

    return [prevBTN, result, nextBTN].join('');
  }
}
