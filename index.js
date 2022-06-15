;(function() {
  window.draggableContent = function(el) {
    const wrap = document.querySelector(el)
    const nodes = []
    const children = wrap.children
    let dragItem = null
    let offset = null
    let isDrag = false
    let height = 0
    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('draggable', 'true')
      children[i].addEventListener('dragstart', dragStart)
      children[i].addEventListener('dragenter', dragEnter)
      children[i].addEventListener('transitionend', () => isDrag = false)
      height += children[i].getBoundingClientRect().height
    }
    window.addEventListener('resize', initElement(Array.from(children)))
    initElement(Array.from(children))
    wrap.style.height = height + 'px'
    
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
        nodes[idx].top = parseInt(getComputedStyle(elem).top)
        nodes[idx].height = elem.getBoundingClientRect().height
      })
    }

    function dragStart(e) {
      dragItem = nodes.find(item => item.node === e.target)
    }
    
    function dragEnter(e) {
      e.preventDefault()
      const tar = e.target
      if (tar === dragItem.node || isDrag === true) {
        return
      }
      isDrag = true
      const node = nodes.find(item => item.node === tar)
      if (dragItem.top > node.top) {
        const temp = node.top
        dragItem.node.style.top = temp + 'px'
        tar.style.top = (node.top = dragItem.top + (dragItem.height - node.height))  + 'px'
        dragItem.top = temp
      } else {
        const temp = dragItem.top
        dragItem.node.style.top = (dragItem.top = node.top + (node.height - dragItem.height)) + 'px'
        tar.style.top = temp + 'px'
        node.top = temp
      }
    }
  }
})()
window.onload = function() {
  draggableContent('.wrap')

}