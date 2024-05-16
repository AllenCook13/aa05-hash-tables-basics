const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    return parseInt(sha256(key).slice(0, 8), 16);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    let ind = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if(!this.data[ind]) {
      this.data[ind] = newPair;
      this.count++;
    } else {
      throw new Error('hash collision or same key/value pair already exists!')
    }
  }

  insertWithHashCollisions(key, value) {
    let ind = this.hashMod(key);
    let newPair = new KeyValuePair(key, value);
    if(!this.data[ind]) {
      this.data[ind] = newPair;
    } else {
      newPair.next = this.data[ind];
      this.data[ind] = newPair;
    }
    this.count++;
  }

  insert(key, value) {
    let ind = this.hashMod(key);
    let cur = this.data[ind];
    while(cur && cur.key !== key) {
      cur = cur.next;
    }
    if(cur) {
      cur.value = value;
    } else {
      let newPair = new KeyValuePair(key, value);
      if(!this.data[ind]) {
        this.data[ind] = newPair;
      } else {
        newPair.next = this.data[ind];
        this.data[ind] = newPair;
      }
      this.count++
    }
  }
}


module.exports = HashTable;
