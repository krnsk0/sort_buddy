const sortedArrayFactory = length => {
  return Array.from({ length: length }, (_, i) => i);
};

const drawBars = array => {
  let sortContainer = document.querySelector('.sort_container');
  array.forEach(arrayElement => {
    let sortBarElement = document.createElement('div');
    sortBarElement.classList.add('sort_bar');
    let height = 300 * (arrayElement / 100);
    sortBarElement.style.height = `${height}px`;
    sortContainer.appendChild(sortBarElement);
  });
};

let array = sortedArrayFactory(100);
drawBars(array);
