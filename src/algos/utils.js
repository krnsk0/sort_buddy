// utility to copy an array object
export const copyData = array => {
  return array.map(obj => Object.assign({}, obj));
};
