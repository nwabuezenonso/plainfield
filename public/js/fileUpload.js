FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

// FilePond.setOptions({
//     stylePanelAspectRatio: 150 / 100,
//     imageResizeTargetWidth: 50,
//     imageResizeTargetHeight: 50
// })

FilePond.parse(document.body)