;(function() {
  window.draggableContent = function(el) {
    const wrap = document.querySelector(el)
    const children = wrap.children
    let dragItem = null
    let offset = null
    let isDrag = false
    for (let i = 0; i < children.length; i++) {
      children[i].setAttribute('draggable', true)
      children[i].addEventListener('dragstart', dragStart)
      children[i].addEventListener('dragenter', dragEnter)
      children[i].addEventListener('transitionend', () => isDrag = false)
    }
    initElement(Array.from(children))
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
      })
    }
    function dragStart(e) {
      dragItem = e.target
      // e.dataTransfer.setDragImage('', 0, 0)
    }
    function dragEnter(e) {
      const tar = e.target
      if (tar === dragItem || isDrag === true) {
        return
      }
      isDrag = true

      const { top: dragItemTop, height: dragItemHeight} = dragItem.getBoundingClientRect()
      const { top: tarTop, height: tarHeight } = tar.getBoundingClientRect()
      if (dragItemTop > tarTop) {
        dragItem.style.top = tarTop - offset + 'px'
        tar.style.top = dragItemTop + (dragItemHeight - tarHeight - offset)  + 'px'
      } else {
        dragItem.style.top = tarTop + (tarHeight - dragItemHeight - offset) + 'px'
        tar.style.top = dragItemTop - offset + 'px'
      }
    }
  }
})()
window.onload = function() {
  draggableContent('.wrap')

}