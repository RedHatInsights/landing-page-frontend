export default (href = '', isBeta = false) =>
  isBeta ? href.replace(/^(\/|\.\/)(?!beta\/)/, '/beta/') : href;
