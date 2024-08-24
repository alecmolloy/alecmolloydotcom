import { Link } from '@/components/Link'
import { WorkItem, WorkItems } from '@/data/work'
import * as React from 'react'
import { Header } from '../Header'

export const WorkCard: React.FunctionComponent<{
  item: WorkItem
}> = ({ item }) => {
  return (
    <li
      key={item.name}
      id={item.name}
      style={{
        gridColumn: 'span 1',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Link
        href={item.URL}
        target='_new'
        style={{
          textDecoration: 'none',
          color: '#444',
        }}
      >
        <img
          alt={item.title}
          src={item.img.src}
          width={400}
          height={300}
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
        <div
          style={{
            marginTop: '0.5em',
            fontSize: '0.66em',
            lineHeight: '1.5em',
            fontStyle: 'italic',
          }}
        >
          {item.title}{' '}
          <span style={{ fontStyle: 'normal', color: '#888' }}>
            ({item.date})
          </span>
        </div>
        <div
          style={{
            fontSize: '0.66em',
            lineHeight: '1.5em',
            color: '#888',
          }}
        >
          {item.description}
        </div>
      </Link>
    </li>
  )
}

const Work = () => {
  return (
    <>
      <Header breadcrumbs={['work']} />
      <ol
        className='wrapper work-wrapper'
        style={{
          display: 'grid',
          listStyle: 'none',
          overflowY: 'hidden',
          padding: '0 0.5rem 1em',
          gridColumnGap: '1rem',
          gridRowGap: '1rem',
          margin: '1rem auto',
        }}
      >
        {WorkItems.map((item, i) => (
          <WorkCard key={i} item={item} />
        ))}
      </ol>
    </>
  )
}

export default Work
