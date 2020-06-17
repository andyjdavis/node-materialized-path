import { materialize, HierarchyNode } from '.'

test('materialize empty hierarchy', () => {
    const input: HierarchyNode[] = []
    expect(materialize(input)).toEqual([])
})

test('materialize flat hierarchy', () => {
    const input: HierarchyNode[] = [
        {
            id: 1,
            parentId: null,
            path: '',
        },
        {
            id: 2,
            parentId: null,
            path: '',
        },
        {
            id: 3,
            parentId: null,
            path: '',
        },
    ]
    expect(materialize(input)).toEqual(input)
})

test('materialize tall hierarchy', () => {
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
    expect(materialize(input)).toEqual(output)
})
