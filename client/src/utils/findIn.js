export default (data, keyPath) => {
  let item = data;
  keyPath.forEach(path => item = item.children.find(v => v.id === path));
  return item;
}