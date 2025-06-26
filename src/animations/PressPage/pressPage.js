import pressH from './PressH/pressH'
import pressContent from './pressContent/pressContent'
import pressCampLink from './PressLinkHover/pressCampLink'
import pressLink from './PressLinkHover/pressLink'
import { default as featuredButton } from '../buttons/featuredButton'

const pressPage = () => {
    // pressH()
    pressContent()
    pressCampLink()
    pressLink()
    featuredButton()
}

export default pressPage