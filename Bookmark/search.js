let inputDom = document.getElementById('inputDom')
let searchDom = document.getElementById('searchDom');
let outputDom = document.getElementById('outputDom');

function getQuery(query) {
  chrome.bookmarks.getTree(function(node) {
    let results = [];
    let children = document.createElement('div');
    const loop = function(arr) {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].children && arr[i].children.length > 0) {
          loop(arr[i].children)
        } else {
          results.push(arr[i])
        }
      }
    }
    loop(node)
    const arr = results.filter(item => {
      return item.title.indexOf(query) > -1
    })
    for (let i = 0; i < arr.length; i++) {
      const html = document.createElement('a')
      html.setAttribute('src', arr[i].url)
      html.setAttribute('class', "link")
      html.innerHTML = '-' + arr[i].title
      html.onclick = function() {
        chrome.tabs.create({url: arr[i].url});
      }
      children.appendChild(html)
    }
    outputDom.appendChild(children)
  })
}

searchDom.onclick = function(element) {
  let inputValue = inputDom.value;
  outputDom.innerHTML = '';
  getQuery(inputValue)
};
