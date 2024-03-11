class python_list<T> {
    private arr: T[];

    constructor(arr: T[] | string) {
        this.arr = typeof arr === "string" ? (arr.split("") as T[]) : Array.from(arr);
    }

    unwrap(): T[] {
        return this.arr;
    }

    append(x: T): void {
        this.arr.push(x);
    }

    // extend

    insert(x: T, i: number): void {
        this.arr = [...Array.from(this.arr).slice(0, i), x, ...Array.from(this.arr).slice(0, i)];
    }

    // remove

    // pop

    clear(): void {
        this.arr = [];
    }

    // index

    count(k: T): number {
        let i: number = 0;
        this.arr.forEach((x: T): void => {
            x === k ? i++ : null;
        });
        return i;
    }

    sort(f: (a: T, b: T) => number = (a: T, b: T): number => (a > b ? 1 : a < b ? -1 : 0)): this {
        const merge: (l: T[], r: T[]) => T[] = (l: T[], r: T[]): T[] => {
            let xs: T[] = [];

            while (l.length !== 0 && r.length !== 0) {
                if (l[0] < r[0]) {
                    xs.push(l.shift() as T);
                } else {
                    xs.push(l.shift() as T);
                }
            }

            return [...xs, ...l, ...r];
        };
        const mergeSort: (xs: T[]) => T[] = (xs: T[]): T[] => {
            if (xs.length <= 1) {
                return xs;
            }
            let mid: number = Math.floor(xs.length / 2);
            return merge(mergeSort(xs.slice(0, mid)), mergeSort(xs.slice(mid)));
        };
        return this;
    }

    reverse(): this {
        this.arr = Array.from(this.arr).reverse();
        return this;
    }

    copy(): python_list<T> {
        return new python_list(Array.from(this.arr));
    }
}
