class LocalStorageMock {
  public length: number = 0
  private store = {}

  public clear() {
    this.store = {}
    this.length = 0
  }

  public getStore() {
    return this.store
  }

  public getItem(key: string) {
    return this.store[key] || null
  }

  public key(index: number) {
    let counter = 0
    for (const key in this.store) {
      if (this.store.hasOwnProperty(key)) {
        if (counter === index) {
          return key
        }

        counter += 1
      }
    }

    return null
  }

  public setItem(key: string, value: string) {
    if (!this.store.hasOwnProperty(key)) {
      this.length += 1
    }
    this.store[key] = value
  }

  public removeItem(key: string) {
    if (this.store.hasOwnProperty(key)) {
      this.length -= 1
    }
    delete this.store[key]
  }
}

export default LocalStorageMock
