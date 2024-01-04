interface StorageInterface {
  [index: string]: string;
}

class StorageMock {
  store = <StorageInterface>{};

  length = 0;

  clear() {
    this.store = {};
  }

  getItem(key: keyof typeof this.store) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    if (!(key in this.store)) this.length += 1;
    this.store[key] = value;
  }

  removeItem(key: keyof typeof this.store) {
    delete this.store[key];
    this.length -= 1;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    if (index >= 0 && index < keys.length) {
      return keys[index];
    }
    return null;
  }
}

export default StorageMock;
