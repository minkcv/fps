function distance(p1, p2) {
    var dx = Math.abs(p1.x - p2.x);
    var dy = Math.abs(p1.y - p2.y);
    return Math.sqrt(dx * dx + dy * dy);
}

function updateDebug() {
    document.querySelector('.three > #x-pos').innerHTML = 'X: ' + TH.camera.position.x.toFixed(2);
    document.querySelector('.three > #z-pos').innerHTML = 'Z: ' + TH.camera.position.z.toFixed(2);
    document.querySelector('.three > #angle').innerHTML = 'R: ' + TH.camera.rotation.y.toFixed(2);

    document.querySelector('.matter > #x-pos').innerHTML = 'X: ' + MA.player.position.x.toFixed(2);
    document.querySelector('.matter > #y-pos').innerHTML = 'Y: ' + MA.player.position.y.toFixed(2);
    document.querySelector('.matter > #angle').innerHTML = 'R: ' + MA.player.angle.toFixed(2);
}