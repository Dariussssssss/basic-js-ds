const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }
  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this._addNode(this.rootNode, newNode);
    }
  }
  _addNode(currentNode, newNode) {
    if (newNode.data < currentNode.data) {
      if (!currentNode.left) {
        currentNode.left = newNode;
      } else {
        this._addNode(currentNode.left, newNode);
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode;
      } else {
        this._addNode(currentNode.right, newNode);
      }
    }
  }
  has(data) {
    return this._hasNode(this.rootNode, data);
  }
  _hasNode(currentNode, data) {
    if (!currentNode) {
      return false;
    }
    if (data < currentNode.data) {
      return this._hasNode(currentNode.left, data);
    } else if (data > currentNode.data) {
      return this._hasNode(currentNode.right, data);
    } else {
      return true; // data is equal to currentNode.data
    }
  }
  find(data) {
    return this._findNode(this.rootNode, data);
  }
  _findNode(currentNode, data) {
    if (!currentNode) {
      return null;
    }
    if (data < currentNode.data) {
      return this._findNode(currentNode.left, data);
    } else if (data > currentNode.data) {
      return this._findNode(currentNode.right, data);
    } else {
      return currentNode;
    }
  }
  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }
  _removeNode(currentNode, data) {
    if (!currentNode) {
      return null;
    }
    if (data < currentNode.data) {
      currentNode.left = this._removeNode(currentNode.left, data);
      return currentNode;
    } else if (data > currentNode.data) {
      currentNode.right = this._removeNode(currentNode.right, data);
      return currentNode;
    } else {
      if (!currentNode.left && !currentNode.right) {
        return null;
      }
      if (!currentNode.left) {
        return currentNode.right;
      } else if (!currentNode.right) {
        return currentNode.left;
      }
      const minNode = this._findMinNode(currentNode.right);
      currentNode.data = minNode.data;
      currentNode.right = this._removeNode(currentNode.right, minNode.data);
      return currentNode;
    }
  }
  _findMinNode(currentNode) {
    while (currentNode && currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  min() {
    const minNode = this._findMinNode(this.rootNode);
    return minNode ? minNode.data : null;
  }
  max() {
    let currentNode = this.rootNode;
    while (currentNode && currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode ? currentNode.data : null;
  }
}
module.exports = {
  BinarySearchTree
};
