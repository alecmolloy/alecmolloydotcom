import { WorkItems } from '@/data/work'
import { Container, Grid } from '@radix-ui/themes'
import { WorkCard } from './work/page'

export const Portfolio = () => (
  <Container
    size='4'
    id='portfolio'
    style={{
      minHeight: '100vh',
    }}
  >
    <Grid
      className='wrapper work-wrapper'
      gapX='4'
      gapY='6'
      columns={{
        initial: '1',
        md: '2',
        lg: '3',
      }}
      style={{
        overflowY: 'hidden',
        padding: '0 0.5rem 1em',
        margin: '1rem auto',
      }}
    >
      {WorkItems.map((item, i) => (
        <WorkCard key={i} item={item} />
      ))}
    </Grid>
  </Container>
)