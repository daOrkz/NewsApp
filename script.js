
const newsContainer      = document.querySelector('.flex-news')

const form               = document.forms['form-news']
const serchNews          = form.elements['serch-news']
const selectCategory     = form.elements['category']
const selectCountry      = form.elements['country']
const searcBtn           = form.elements['search-btn']


function queryHTTP(url, method = 'GET', body = '') {

  const xhr = new XMLHttpRequest()

  xhr.open(method, url)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onload = () => {
    if(xhr.status >= 400) {
      getError(`Error: ${xhr.status}`, xhr)
      return
    } else {
      const response = JSON.parse(xhr.response)
      renderNews(response.articles)
    }
  }

  xhr.onerror = () => {
    getError(`Error: ${xhr.status}`, xhr)
  }

  xhr.send(JSON.stringify(body))
}

const createURL = {
  apiKey: 'f57c9d6d35e745bb9c571443b47954bb',
  apiURL: 'https://news-api-v2.herokuapp.com',

  everyThing(query = 'bitcoin') {
    return `
      ${this.apiURL}/everything?q=${query}&apiKey=${this.apiKey}
    `
  },
  headlines(country = 'us', category = '') {
    return `
      ${this.apiURL}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}
    `
  }
}

function createURLaaaaaaaaa(country = 'us', category = '') {
  const apiKey = 'f57c9d6d35e745bb9c571443b47954bb'
  const apiURL = 'https://news-api-v2.herokuapp.com'

  // let url = 'https://news-api-v2.herokuapp.com/everything?q=bitcoin&apiKey=' + apiUrl
  // let url = 'https://news-api-v2.herokuapp.com/top-headlines?country=us&category=sports&apiKey=' + apiKey
  let url = `${apiURL}/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`

  console.log(url);
  return url
}

function renderNews(newsArr) {
  if(!newsArr.length) {
    renderEmpty()
    return
  }

  let container = ''
  newsContainer.innerHTML = ' '

  newsArr.forEach(news => {
    container += newsHTML(news)
  });

  newsContainer.insertAdjacentHTML('afterbegin', container)
}


function renderEmpty() {
  newsContainer.innerHTML = 'EMPTY'
}

function newsHTML(news) {
  return `
  <div class="card-news">
    <img src="${news.urlToImage}" alt="">
    <h2>${news.title}</h2>
    <h3>${news.description}</h3>
    <a href="${news.url}"><b>Read More</b></a>
  </div>
  `
}

form.onsubmit = (e) => {
  e.preventDefault()
  const formValue = getFormValue()

  if(formValue.serchNewsValue) {
    queryHTTP(createURL.everyThing(formValue.serchNewsValue), 'GET', formValue.serchNewsValue)
  } else {
    queryHTTP(createURL.headlines(formValue.selectCountryValue, formValue.selectCategoryValue))
  }
  clearInput()
}

function getFormValue() {
  return {
    serchNewsValue: serchNews.value,
    selectCategoryValue: selectCategory.value,
    selectCountryValue: selectCountry.value,
  }
}

function clearInput() {
  serchNews.value = ''
}


document.addEventListener('DOMContentLoaded', function() {
  queryHTTP(createURL.headlines())
})

function getError(err, res) {
  console.error(err, res)
}


//Обработчик пустой строки Input
//Обработчик ошибок
//Анимация загрузки
