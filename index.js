;(function() {
  window.draggableContent = function(el) {
    const wrap = document.querySelector(el)
    const children = wrap.children
    let target = {
      node: null,
      cood: {
        x: 0,
        y: 0
      }
    }
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute('draggable', true)
      children[i].addEventListener('dragstart', dragStart)
      children[i].addEventListener('dragenter', dragEnter)
    }
    function dragStart() {
      target.node = this
    }
    function dragEnter(e) {
      const tar = e.target
      if (tar === target.node) {
        return
      }
      const children = Array.from(wrap.children)
      const isNext = children.findIndex(item => item === target.node) < children.findIndex(item => item === tar)
      if (isNext) {
        wrap.insertBefore(tar, target.node)
      } else {
        wrap.insertBefore(target.node, tar)
      }
    }
  }
})()
draggableContent('.wrap')