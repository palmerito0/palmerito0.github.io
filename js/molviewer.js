let stage = undefined;
$( document ).ready(() => {
    // Set up the viewer
    let element = $('#mol-container');
    console.log(element);
    var schemeId = NGL.ColormakerRegistry.addSelectionScheme( [
        [ "#55CDFC", "306-395" ],
        [ "#F7A8B8", "396-494" ],
    ], "Transmembrane 1a52" );
    stage = new NGL.Stage('mol-container', {backgroundColor: "#ebebeb"})
    stage.loadFile('rcsb://1a52').then((o) => {
        console.log(o)
        o.addRepresentation( "cartoon", { color: schemeId } );
        stage.autoView()
        stage.mouseControls.remove("*")
        stage.setSpin(true)
        stage.handleResize()
    })
});

$( window ).resize(() => {
    stage.handleResize()
})