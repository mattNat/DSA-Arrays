import memory from require('./memory');
/*
  Array starts out with zero length and pointer to zero blocks of memory
*/
class Array {
  constructor() {
    this.length = 0;
    this.ptr = memory.allocate(this.length);
  }

  /*
    Resize array using _resize method
  */
  push(value) {
    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }


  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
}
Array.SIZE_RATIO = 3;

// retrieving values - O(1) operation
get(index) {
  if (index < 0 || index >= this.length) {
      throw new Error('Index error');
  }
  return memory.get(this.ptr + index);
}
console.log(get(0));

// popping values - O(1) operation
pop() {
  if (this.length == 0) {
      throw new Error('Index error');
  }
  const value = memory.get(this.ptr + this.length - 1);
  this.length--;
  return value;
}

// inserting values
// shift all of the values after the new value back one position
insert(index, value) {
  if (index < 0 || index >= this.length) {
      throw new Error('Index error');
  }

  if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
  }

  memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
  memory.set(this.ptr + index, value);
  this.length++;
}

// removing values
// similar to inserting 
remove(index) {
  if (index < 0 || index >= this.length) {
      throw new Error('Index error');
  }
  memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
  this.length--;
}