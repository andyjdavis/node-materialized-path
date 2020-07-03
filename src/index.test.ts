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

test('materialize tall hierarchy with string IDs', () => {
    const input: HierarchyNode[] = [
        {
            id: 'animals',
            parentId: null,
            path: '',
        },
        {
            id: 'aquatic animals',
            parentId: 'animals',
            path: '',
        },
        {
            id: 'sharks',
            parentId: 'aquatic animals',
            path: '',
        },
    ]
    const output: HierarchyNode[] = [
        {
            id: 'animals',
            parentId: null,
            path: '',
        },
        {
            id: 'aquatic animals',
            parentId: 'animals',
            path: 'animals',
        },
        {
            id: 'sharks',
            parentId: 'aquatic animals',
            path: 'animals,aquatic animals',
        },
    ]
    expect(materialize(input)).toEqual(output)
})

test('throw an error if an invalid parent ID is supplied', () => {
    const input: HierarchyNode[] = [
        {
            id: 'animals',
            parentId: null,
            path: '',
        },
        {
            id: 'aquatic animals',
            parentId: 'rocks',
            path: '',
        },
    ]
    expect(() => materialize(input)).toThrowError(
        'Couldnt find parent. parentId: rocks node id: aquatic animals',
    )
})
