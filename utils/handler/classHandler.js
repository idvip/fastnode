/**
 * 获取function的参数名
 * */
function args(func) {
  return (func + '')
    .replace(/[/][/].*$/gm, '') // strip single-line comments
    .replace(/\s+/g, '') // strip white space
    .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
    .split('){', 1)[0]
    .replace(/^[^(]*[(]/, '') // extract the parameters
    .replace(/=[^,]+/g, '') // strip any ES6 defaults
    .split(',')
    .filter(Boolean); // split & filter [""]
}

/**
 * 在指定对象上获取指定属性值
 * objs=Object[]
 * names=String[]
 * input:[{a:1},{b:2},{c:3,d:4},['a','b','d']]
 * output:[1,2,4]
 * */
function getArgumentsByObjects(objs, names) {
  objs = objs || [];
  names = names || [];
  return names.map((a) => {
    for (let i = 0, ci; (ci = objs[i]); i++) {
      if (ci[a]) return ci[a];
    }
  });
}

module.exports = {
  args,
  getArgumentsByObjects,
};
