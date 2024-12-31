type Events = 'click' | 'scroll' | 'mousemove';
type ExclusiveForImage = Exclude<Events, 'scroll'>

const handleEvent = (event: ExclusiveForImage) => {
    // do something
}