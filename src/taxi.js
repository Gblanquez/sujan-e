import { Core } from '@unseenco/taxi'
import DefaultRenderer from './renderers/DefaultRenderer'

// Initialize Taxi
const taxi = new Core({
    renderers: {
        default: DefaultRenderer
    }
})

export default taxi 