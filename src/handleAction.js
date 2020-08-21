export function handleMoving(event, objectHandle, functionDestroy) {
  event.stopPropagation();
  event.preventDefault();
  if (objectHandle.isMousePressed) {
    objectHandle.pixelDerived +=
      event.clientX - objectHandle.pointercoordonnes.x;
    objectHandle.pointercoordonnes.x = event.clientX;
    if (Math.abs(objectHandle.pixelDerived) > 50) {
      objectHandle.opacity -= (Math.abs(objectHandle.pixelDerived) - 50) / 1000;
      if (
        objectHandle.opacity < 0.1 ||
        Math.abs(objectHandle.pixelDerived) > window.innerHeight / 3
      ) {
        functionDestroy();
      }
    }
  }
}

export function handlePressedDown(event, objectHandle, classString) {
  objectHandle.isMousePressed = true;
  objectHandle.pointercoordonnes.x = event.clientX;
  objectHandle.pointercoordonnes.y = event.clientY;
  objectHandle.pixelDerived = 0;
  objectHandle.opacity = 1;
  objectHandle.classAdd = classString;
}
export function handlePressedUp(event, objectHandle, classString) {
  objectHandle.isMousePressed = false;
  objectHandle.pointercoordonnes.x = 0;
  objectHandle.pointercoordonnes.y = 0;
  objectHandle.pixelDerived = 0;
  objectHandle.opacity = 1;
  objectHandle.classAdd = classString;
}
