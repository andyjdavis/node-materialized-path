# node-materialized-path

This is a simple module to calculate paths for an array of nodes as described at https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-materialized-paths/

## Usage

This is the node type definition

```
export interface HierarchyNode {
    id: number | string
    parentId: number | string | null
    path: string
}
```

Here is how you call the module to create a new array with paths set. The input array is not modified.

```
const input: HierarchyNode[] = [
        {
            id: 1,
            parentId: null,
            path: '',
        },
        {
            id: 2,
            parentId: 1,
            path: '',
        },
        {
            id: 3,
            parentId: 2,
            path: '',
        },
    ]

    const output = materialize(input)
```

output will then equal this...

```
const output: HierarchyNode[] = [
        {
            id: 1,
            parentId: null,
            path: '',
        },
        {
            id: 2,
            parentId: 1,
            path: '1',
        },
        {
            id: 3,
            parentId: 2,
            path: '1,2',
        },
    ]
```

See src/index.test.ts for a more thorough examination of this module's behaviour.
