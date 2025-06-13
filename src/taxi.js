import { Core } from '@unseenco/taxi'
import DefaultRenderer from './renderers/DefaultRenderer'


const taxi = new Core({
    renderers: {
        default: DefaultRenderer
    }
})

export default taxi 