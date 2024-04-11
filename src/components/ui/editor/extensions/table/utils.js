// @ts-nocheck
import { findParentNode } from '@tiptap/core'
import { CellSelection, TableMap } from '@tiptap/pm/tables'

export function isRectSelected(rect) {
  return (selection) => {
    const map = TableMap.get(selection.$anchorCell.node(-1))
    const start = selection.$anchorCell.start(-1)
    const cells = map.cellsInRect(rect)
    const selectedCells = map.cellsInRect(
      map.rectBetween(selection.$anchorCell.pos - start, selection.$headCell.pos - start),
    )

    for (let i = 0, count = cells.length; i < count; i += 1) {
      if (!selectedCells.includes(cells[i]))
        return false
    }

    return true
  }
}

export function findTable(selection) {
  return findParentNode(node => node.type.spec.tableRole && node.type.spec.tableRole === 'table')(selection)
}

export const isCellSelection = selection => selection instanceof CellSelection

export function isColumnSelected(columnIndex) {
  return (selection) => {
    if (isCellSelection(selection)) {
      const map = TableMap.get(selection.$anchorCell.node(-1))

      return isRectSelected({
        left: columnIndex,
        right: columnIndex + 1,
        top: 0,
        bottom: map.height,
      })(selection)
    }

    return false
  }
}

export function isRowSelected(rowIndex) {
  return (selection) => {
    if (isCellSelection(selection)) {
      const map = TableMap.get(selection.$anchorCell.node(-1))

      return isRectSelected({
        left: 0,
        right: map.width,
        top: rowIndex,
        bottom: rowIndex + 1,
      })(selection)
    }

    return false
  }
}

export function isTableSelected(selection) {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1))

    return isRectSelected({
      left: 0,
      right: map.width,
      top: 0,
      bottom: map.height,
    })(selection)
  }

  return false
}

export function getCellsInColumn(columnIndex) {
  return (selection) => {
    const table = findTable(selection)
    if (table) {
      const map = TableMap.get(table.node)
      const indexes = Array.isArray(columnIndex) ? columnIndex : Array.from([columnIndex])

      return indexes.reduce(
        (acc, index) => {
          if (index >= 0 && index <= map.width - 1) {
            const cells = map.cellsInRect({
              left: index,
              right: index + 1,
              top: 0,
              bottom: map.height,
            })

            return acc.concat(
              cells.map((nodePos) => {
                const node = table.node.nodeAt(nodePos)
                const pos = nodePos + table.start

                return { pos, start: pos + 1, node }
              }),
            )
          }

          return acc
        },
        [],
      )
    }
    return null
  }
}

export function getCellsInRow(rowIndex) {
  return (selection) => {
    const table = findTable(selection)

    if (table) {
      const map = TableMap.get(table.node)
      const indexes = Array.isArray(rowIndex) ? rowIndex : Array.from([rowIndex])

      return indexes.reduce(
        (acc, index) => {
          if (index >= 0 && index <= map.height - 1) {
            const cells = map.cellsInRect({
              left: 0,
              right: map.width,
              top: index,
              bottom: index + 1,
            })

            return acc.concat(
              cells.map((nodePos) => {
                const node = table.node.nodeAt(nodePos)
                const pos = nodePos + table.start
                return { pos, start: pos + 1, node }
              }),
            )
          }

          return acc
        },
        [],
      )
    }

    return null
  }
}

export function getCellsInTable(selection) {
  const table = findTable(selection)

  if (table) {
    const map = TableMap.get(table.node)
    const cells = map.cellsInRect({
      left: 0,
      right: map.width,
      top: 0,
      bottom: map.height,
    })

    return cells.map((nodePos) => {
      const node = table.node.nodeAt(nodePos)
      const pos = nodePos + table.start

      return { pos, start: pos + 1, node }
    })
  }

  return null
}

export function findParentNodeClosestToPos($pos, predicate) {
  for (let i = $pos.depth; i > 0; i -= 1) {
    const node = $pos.node(i)

    if (predicate(node)) {
      return {
        pos: i > 0 ? $pos.before(i) : 0,
        start: $pos.start(i),
        depth: i,
        node,
      }
    }
  }

  return null
}

export function findCellClosestToPos($pos) {
  const predicate = node => node.type.spec.tableRole && /cell/i.test(node.type.spec.tableRole)

  return findParentNodeClosestToPos($pos, predicate)
}

function select(type) {
  return index => (tr) => {
    const table = findTable(tr.selection)
    const isRowSelection = type === 'row'

    if (table) {
      const map = TableMap.get(table.node)

      // Check if the index is valid
      if (index >= 0 && index < (isRowSelection ? map.height : map.width)) {
        const left = isRowSelection ? 0 : index
        const top = isRowSelection ? index : 0
        const right = isRowSelection ? map.width : index + 1
        const bottom = isRowSelection ? index + 1 : map.height

        const cellsInFirstRow = map.cellsInRect({
          left,
          top,
          right: isRowSelection ? right : left + 1,
          bottom: isRowSelection ? top + 1 : bottom,
        })

        const cellsInLastRow
        = bottom - top === 1
          ? cellsInFirstRow
          : map.cellsInRect({
            left: isRowSelection ? left : right - 1,
            top: isRowSelection ? bottom - 1 : top,
            right,
            bottom,
          })

        const head = table.start + cellsInFirstRow[0]
        const anchor = table.start + cellsInLastRow[cellsInLastRow.length - 1]
        const $head = tr.doc.resolve(head)
        const $anchor = tr.doc.resolve(anchor)

        // @ts-ignore
        return tr.setSelection(new CellSelection($anchor, $head))
      }
    }
    return tr
  }
}

export const selectColumn = select('column')

export const selectRow = select('row')

export function selectTable(tr) {
  const table = findTable(tr.selection)

  if (table) {
    const { map } = TableMap.get(table.node)

    if (map && map.length) {
      const head = table.start + map[0]
      const anchor = table.start + map[map.length - 1]
      const $head = tr.doc.resolve(head)
      const $anchor = tr.doc.resolve(anchor)

      // @ts-ignore
      return tr.setSelection(new CellSelection($anchor, $head))
    }
  }

  return tr
}
