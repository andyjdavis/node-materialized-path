export interface HierarchyNode {
    id: number | string
    parentId: number | string | null
    path: string
}

export function materialize(input: HierarchyNode[]): HierarchyNode[] {
    const output: HierarchyNode[] = []
    let newNode: HierarchyNode | null = null
    let parent: HierarchyNode | null = null

    const findResolved = (id: number | string) => {
        return output.find((toCheck) => toCheck.id == id)
    }

    const findUnresolved = (id: number | string) => {
        return input.find((toCheck) => toCheck.id == id) || null
    }

    const resolveNode = (n: HierarchyNode) => {
        const resolved = findResolved(n.id)
        if (resolved) {
            return resolved
        }

        newNode = { ...n }

        if (newNode.parentId !== null) {
            parent = findUnresolved(newNode.parentId)
            if (!parent) {
                throw new Error(
                    `Couldnt find parent. parentId: ${newNode.parentId} node id: ${n.id}`,
                )
            }
            parent = resolveNode(parent)
            newNode.path = `${parent.path}${parent.path.length > 0 ? ',' : ''}${parent.id}`
        }

        return newNode
    }

    for (let i = 0; i < input.length; i++) {
        output.push(resolveNode(input[i]))
    }
    return output
}
