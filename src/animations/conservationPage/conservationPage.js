import conservationHero from './conservationH/conservationHero'
import conservationIntro from './conservationIntro/conservationIntro'
import conservationStats from './conservationStats/stats'
import pillarContent from './Pillar/pillarContent'
import projects from './projects/project'

const conservationPage = () => {
    // Initialize all conservation page animations
    conservationHero()
    conservationIntro()
    conservationStats()
    pillarContent()
    projects()
}

export default conservationPage
