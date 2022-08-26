import { createMovieCards, getNewMovi } from '../index';
import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';

export default class MyPagimation {
  constructor({ cardContainer, paginationContainer }) {
    this.tbody = document.querySelector(`.${cardContainer}`);
    this.pgContainer = document.querySelector(`.${paginationContainer}`);
    this.datatableUsers = load(CURRENTFILMS_LOCALSTORAGE_KEY);
    this.mobileDots = false;
    this.callGoTo;
    this.callNextBtn;
    this.callPrevBtn;
    this.state = {
      currentNumPage: 0,
      postOnPerPage: 10,
      numOfPages: 0,
      numOfButtons: [],
    };
  }

  inicialization() {
    console.log(this.datatableUsers);
    // this.state.numOfPages = Math.ceil(
    //   this.datatableUsers.length / this.state.postOnPerPage
    // );
    this.state.numOfPages = load('total_pages');
    console.log(`total_pages  --- ${this.state.numOfPages}`);
    for (let i = 1; i <= this.state.numOfPages; i++) {
      this.state.numOfButtons.push(i);
    }
    // console.log('this.state');
    // console.log(this.state);
    this.render();
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
      console.log('gaTo');
      this.state.currentNumPage = Number(event.target.textContent) - 1;
      await this.getNewPage(this.state.currentNumPage+1);

      this.render();
    }
  }

  async nextPage() {
    // console.log(this);
    this.state.currentNumPage += 1;

    if (this.state.currentNumPage > this.state.numOfPages - 1) {
      this.state.currentNumPage = this.state.numOfPages;
      return;
    }
    await this.getNewPage(this.state.currentNumPage + 1);

    this.render();
  }

  async previusPage() {
    this.state.currentNumPage -= 1;
    if (this.state.currentNumPage < 0) {
      this.state.currentNumPage = 0;
      return;
    }
    await this.getNewPage(this.state.currentNumPage+1);

    this.render();
  }
  async getNewPage(page) {
    await getNewMovi(page);
    this.datatableUsers = load(CURRENTFILMS_LOCALSTORAGE_KEY);
  }

  render() {
    if (this.callGoTo) {
      this.pgContainer.removeEventListener('click', this.callGoTo);
    }

    // const currentDataToRender = this.datatableUsers.slice(
    //   this.state.currentNumPage * this.state.postOnPerPage,
    //   (this.state.currentNumPage + 1) * this.state.postOnPerPage
    // );
    const currentDataToRender = this.datatableUsers;

    const dataTable = this.markap(currentDataToRender);
    const navigation = this.paginationButtons();

    this.tbody.innerHTML = '';
    this.pgContainer.innerHTML = '';
    this.tbody.insertAdjacentHTML('beforeend', dataTable);
    this.pgContainer.insertAdjacentHTML('beforeend', navigation);
    this.pgContainer.removeEventListener('click', this.goToPage.bind(this));
    this.callGoTo = this.goToPage.bind(this);

    this.pgContainer.addEventListener('click', this.callGoTo);
  }
  // temp(e) {
  //   console.log(e);
  //     this.goToPage(e);

  // }

  markap(array) {
    // const result = array
    //   .map(data => {
    //     return `
    //                             <tr key=${data.id}>
    //                               <td>${data.id}</td>
    //                               <td>${data.name}</td>
    //                               <td>${data.position}</td>
    //                               <td>${data.gender}</td>
    //                               <td>${data.email}</td>
    //                               <td>${data.salary}</td>
    //                             </tr>`;
    //   })
    //   .join('');
    const result = createMovieCards(array);
    return result;
  }

  paginationButtons() {
    let dotsInitial = '...';
    let dotsLeft = '... ';
    let dotsRight = ' ...';
    const { currentNumPage, numOfPages, numOfButtons } = this.state;
    let tempNumberOfButtons = [...numOfButtons];
    const currentNumPage_1 = currentNumPage + 1;

    if (this.mobileDots === true) {
      // from 5 to 8 -> (10 - 2)
      if (numOfButtons.length < 6) {
        tempNumberOfButtons = numOfButtons;
        // alert('1');
      } else if (currentNumPage_1 < 3) {
        const sliced1 = [1, 2, 3, 4, 5];
        // sliced1 (5-2, 5) -> [4,5]
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
        // alert('1');
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
    }" 
                      >
                        <a class="dt-link js-next-page"data-action="-1">
                          Prev
                        </a>
                      </li>`;
    const nextBTN = `    <li class="dt-item  ${
      currentNumPage_1 === numOfButtons.length ? 'disabled' : ''
    }"
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

// slider.render();

// const tbody = document.querySelector('.js-tbody');
// const plus = document.querySelector('.js-plus-pag');
// const minus = document.querySelector('.js-minus-pag');

// plus.addEventListener('click', () => slider.nextPage());
// minus.addEventListener('click', () => slider.previusPage());
