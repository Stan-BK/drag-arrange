;(function() {
  const nodes = []
  window.draggableContent = function(el) {
    const wrap = document.querySelector(el)
    const children = wrap.children
    let dragItem = null
    let offset = null
    let isDrag = false
    let height = 0
    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('draggable', true)
      children[i].addEventListener('dragstart', dragStart)
      children[i].addEventListener('dragenter', dragEnter)
      children[i].addEventListener('transitionend', () => isDrag = false)
      height += children[i].getBoundingClientRect().height
    }
    initElement(Array.from(children))
    wrap.style.height = height + 'px'
    console.log(nodes)
    function initElement(elements) {
      const arr = []
      for (let i = 0; i < elements.length; i++) {
        arr.push(elements[i].getBoundingClientRect().top)
      }
      offset = arr[0]
      arr.forEach((top, idx) => {
        const elem = elements[idx]
        elem.style.position = 'absolute'
        elem.style.top = top - offset + 'px'
        nodes[idx] = {}
        nodes[idx].node = elem
        nodes[idx].top = elem.getBoundingClientRect().top
        nodes[idx].height = elem.getBoundingClientRect().height
      })
    }
    function dragStart(e) {
      dragItem = nodes.find(item => item.node === e.target)
      // e.dataTransfer.setDragImage('', 0, 0)
    }
    function dragEnter(e) {
      const tar = e.target
      if (tar === dragItem || isDrag === true) {
        return
      }
      isDrag = true

      // const { top: dragItemTop, height: dragItemHeight} = dragItem.getBoundingClientRect()
      // const { top: tarTop, height: tarHeight } = tar.getBoundingClientRect()
      const node = nodes.find(item => item.node === tar)
      console.log(dragItem, node)
      if (dragItem.top > node.top) {
        dragItem.node.style.top = node.top + 'px'
        tar.style.top = dragItem.top + (dragItem.height - node.height)  + 'px'
        node.top = dragItem.top + (dragItem.height - node.height)
        // dragItem.top = dragItem.top
      } else {
        dragItem.node.style.top = node.top + (node.height - dragItem.height) + 'px'
        tar.style.top = dragItem.top + 'px'
      }
    }
  }
})()
window.onload = function() {
  draggableContent('.wrap')

}