class Node<P> {
  #data: P;
  #next: Node<P> | null | undefined;

  constructor(data: P) {
    this.#data = data;
    this.#next = null;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  get next() {
    return this.#next;
  }

  set next(node) {
    this.#next = node;
  }
}

class LinkedList<T> {
  #tail: Node<T> | null | undefined;

  constructor(data: T[]) {
    this.#tail = null;

    this.insert(data);
  }

  insert(data: T[]) {
    for (const node of data) {
      const newNode = new Node(node);

      if (this.#tail === null) {
        newNode.next = newNode;
      } else {
        newNode.next = this.#tail?.next;
        // @ts-ignore
        this.#tail.next = newNode;
      }
      this.#tail = newNode;
    }
  }

  get(index: number) {
    if (index > -1 && this.#tail !== null) {
      let current = this.#tail?.next;
      let i = 0;

      do {
        if (i === index) {
          return current;
        }

        current = current?.next;
        i++;
      } while (current !== this.#tail?.next && i <= index);
    }

    return undefined;
  }

  clear() {
    this.#tail = null;
  }

  get size() {
    if (this.#tail === null) {
      return 0;
    }

    let current = this.#tail?.next;
    let count = 0;

    do {
      count++;
      current = current?.next;
    } while (current !== this.#tail?.next);

    return count;
  }
}

export { LinkedList };
