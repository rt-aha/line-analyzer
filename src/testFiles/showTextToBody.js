const showText = (text) => {
  const ele = document.createElement('p');
  ele.innerHTML = 'Hi!!, ' + text;
  ele.className = 'p-tag';

  const bodyEle = document.querySelector('body');
  bodyEle.append(ele);
};

export { showText };
