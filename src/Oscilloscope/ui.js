let scopeCanvas = null

let draw = scope => {
  scope.draw(scopeCanvas.myContext)
  requestAnimationFrame(draw.bind(null, scope))
}

let setupCanvases = () => {
  scopeCanvas = document.getElementById('scope');
  scopeCanvas.width = 512;
  scopeCanvas.height = 256;
  scopeCanvas.myContext = scopeCanvas.getContext('2d')
}

export default scope => {
  setupCanvases()
  draw(scope)
}
