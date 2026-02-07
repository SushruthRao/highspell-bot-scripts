let isDropping = false;

setInterval(() => {
  const player = window.tV._entityManager._mainPlayer;
  const playerState = player._currentState.getCurrentState();
  const inventoryCount = player.Inventory.Items.filter(
    item => item !== null
  ).length;
  
  // Inventory full (28 slots)
  if (inventoryCount === 28 && !isDropping) {
    isDropping = true;
    let dropIndex = 1;
    const dropInterval = setInterval(() => {
      if (dropIndex < 28) {
        temp1.send(`42["1",[89,[2,0,${dropIndex},64,1,0]]]`); // woodlogs
        temp1.send(`42["1",[89,[2,0,${dropIndex},182,1,0]]]`); // luckylogs
        dropIndex++;
      } else {
        clearInterval(dropInterval);
        isDropping = false; // Reset dropping state when done
      }
    }, 800); // 0.8 seconds = 800ms
  }
  
  // Player idle / ready state - only chop if not dropping
  if (playerState === 0 && !isDropping) {
    // Replace 2818 with the tree entity ID you want to chop
    temp1.send('42["1",[42,[10,0,2818]]]');
  }
}, 2000);
