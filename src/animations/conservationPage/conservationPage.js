import conservationHero from './conservationH/conservationHero'
import conservationIntro from './conservationIntro/conservationIntro'
import conservationStats from './conservationStats/stats'
import pillarContent from './Pillar/pillarContent'
import projects from './projects/project'
import initCertificationAnimation from '../certificationSection/certificationSection'
import initCollectionAnimation from '../collectionSection/collectionSection'
import initCampLinkAnimation from '../campLink/campLink'
import itine from './Itine/itine'

const conservationPage = () => {

    // conservationHero()
    conservationIntro()
    conservationStats()
    initCertificationAnimation()
    initCampLinkAnimation()
    initCollectionAnimation()
    pillarContent()
    projects()
    itine()
}

export default conservationPage
