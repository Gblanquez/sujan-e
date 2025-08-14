import pressH from './PressH/pressH'
import pressContent from './pressContent/pressContent'
import pressCampLink from './PressLinkHover/pressCampLink'
import pressLink from './PressLinkHover/pressLink'
import { default as featuredButton } from '../buttons/featuredButton'
import initFilterCampCarousel from './filterCamp'
import initFilterYearCarousel from './yearCamp'

const pressPage = () => {
    // pressH()
    pressContent()
    pressCampLink()
    pressLink()
    featuredButton()
    // initFilterCampCarousel()
    // initFilterYearCarousel()
}

export default pressPage