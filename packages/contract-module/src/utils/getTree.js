function getPropByName(obj, desc) {
  var arr = desc.split(".");

  while (arr.length && obj) {
    var comp = arr.shift();
    var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp);
    if ((match !== null) && (match.length == 3)) {
      var arrayData = { arrName: match[1], arrIndex: match[2] };
      if (obj[arrayData.arrName] != undefined) {
        obj = obj[arrayData.arrName][arrayData.arrIndex];
      } else {
        obj = undefined;
      }
    } else {
      obj = obj[comp];
    }
  }

  return obj;
}

export default function getTree(data, primaryIdName, parentIdName) {
  if (!data || data.length == 0 || !primaryIdName || !parentIdName)
    return [];

  var tree = [],
    rootIds = [],
    item = data[0],
    primaryKey = item[primaryIdName],
    treeObjs = {},
    tempChildren = {},
    parentId,
    parent,
    len = data.length,
    i = 0;

  while (i < len) {
    item = data[i++];
    primaryKey = item[primaryIdName];

    if (tempChildren[primaryKey]) {
      item.children = tempChildren[primaryKey];
      delete tempChildren[primaryKey];
    }

    treeObjs[primaryKey] = item;
    parentId = getPropByName(item, parentIdName);// item[parentIdName];
    if (parentId) {
      parent = treeObjs[parentId];

      if (!parent) {
        var siblings = tempChildren[parentId];
        if (siblings) {
          siblings.push(item);
        } else {
          tempChildren[parentId] = [item];
        }
      } else if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [item];
      }
    } else {
      rootIds.push(primaryKey);
    }
  }

  for (var i = 0; i < rootIds.length; i++) {
    tree.push(treeObjs[rootIds[i]]);
  }
  ;

  return tree;
}