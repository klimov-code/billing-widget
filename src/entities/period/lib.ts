class Node<P> {
  #data: P;
  #next: Node<P> | null;

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

export class LinkedList<T> {
  #tail: Node<T> | null;

  constructor(data: T[]) {
    this.#tail = null;

    this.insert(data);
  }

  clear() {
    this.#tail = null;
  }

  get(index: number) {
    if (index > -1 && this.#tail !== null) {
      let current = this.#tail.next;
      let i = 0;

      do {
        if (i === index) {
          return current;
        }

        current = current?.next ?? null;
        i++;
      } while (current !== this.#tail.next && i <= index);
    }

    return undefined;
  }

  insert(data: T[]) {
    for (const node of data) {
      const newNode = new Node(node);

      if (this.#tail === null) {
        newNode.next = newNode;
      } else {
        newNode.next = this.#tail.next;
        this.#tail.next = newNode;
      }
      this.#tail = newNode;
    }
  }

  get size() {
    if (this.#tail === null) {
      return 0;
    }

    let current = this.#tail.next;
    let count = 0;

    do {
      count++;
      current = current?.next ?? null;
    } while (current !== this.#tail.next);

    return count;
  }
}
