import { collaborator, heroImage, project } from '@/app/content-types'
import vbt01 from '@/public/portfolio/vbt/vbt-01.jpg'

export const vbt = project({
  slug: 'vbt',
  title: 'Vijñāna Bhairava Tantra',
  subtitle: 'Meditation App — Design, Illustration, React Native App',
  hero: heroImage(vbt01, 'Vijñāna Bhairava Tantra'),
  date: 'Coming Spring 2025',
  tools: ['React Native', 'TypeScript', 'Figma', 'Photoshop', 'Midjourney'],
  content: (
    <>
      <p>
        The <i>Vijñāna-bhairava-tantra</i> (VBT) is a 9th Century yogic text,
        offering 112 practices to access states of expanded awareness and inner
        stillness. While the VBT has been revered for centuries, translation of
        its spiritual depth and practical guidance has been lacking until now. I
        am working with the translator, Dr. Christopher Hareesh Wallace, and
        Antoine Sakho (Product Advisor) to build this forthcoming meditation and
        textual reference app.
      </p>
      <p>
        This app provides the first full expert English translation of the
        Vijñāna Bhairava Tantra by Wallace, who brings decades of study and
        practice to this work. He leads practitioners into deeper states of
        consciousness through breathwork, visualization, and focused awareness.
      </p>
      <p>
        The app is built with React Native and TypeScript for iOS and Android.
        The Strapi content management system functions as the backend,
        delivering the text and guided meditations on-demand. Interface design,
        mockups, and prototyping was done with Figma. I produced112 beautiful
        illustrations with Midjourney and Photoshop for each of the practices.
      </p>
      <p>
        A selection of free practices will be available, with the full library
        available for purchase through the App Store and Google Play. Launching
        in Spring 2025.
      </p>
    </>
  ),
  deliverables: 'iOS / Android App, Landing webpage',
  role: 'UX / UI Design, Developer, Illustrations',
  collaborators: [
    collaborator(
      'Dr. Christopher Wallace',
      'https://www.tantrailluminated.org/christopher-hareesh-wallis',
    ),
    collaborator('Antoine Sakho', 'https://sakho.me'),
  ],
})
