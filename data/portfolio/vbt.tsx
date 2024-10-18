import { collaborator, heroImage, project } from '@/app/content-types'
import vbt01 from '@/public/portfolio/vbt/vbt-01.jpg'

export const vbt = project(
  'vbt',
  'Vijñāna Bhairava Tantra',
  'Meditation App — Design, Illustration, React Native App',
  heroImage(vbt01, 'Vijñāna Bhairava Tantra'),
  'Coming Spring 2025',
  ['React Native', 'TypeScript', 'Figma', 'Photoshop', 'Midjourney'],
  'iOS / Android App, Landing webpage',
  <>
    <p>
      The <i>Vijñāna-bhairava-tantra</i> (VBT) is a 9th Century yogic text,
      offering 112 practices to access states of expanded awareness and inner
      stillness. While the VBT has been revered for centuries, translation of
      its spiritual depth and practical guidance has been lacking until now. I
      worked with the translator, Hareesh, and Antoine Sakho (Product Advisor)
      to build this forthcoming.
    </p>
    <p>
      This app provides the first full expert English translation of the Vijñāna
      Bhairava Tantra by Hareesh Wallace, who brings decades of study and
      practice to this work. He leads practitioners into deeper states of
      consciousness through breathwork, visualization, and focused awareness.
      His translation stands out for its clarity, accessibility, and depth of
      understanding, offering a complete guide to these timeless practices,
      rooted in tradition yet relevant for modern life.
    </p>
    <p>
      The app is designed for simplicity and flow: meditations play seamlessly
      even when the screen is off, you can download practices for offline use,
      and the catalog is filterable by category and theme.
    </p>
    <p>
      The app is built with React Native for iOS and Android, and written in
      TypeScript. The Strapi content management system functions as the backend,
      delivering the text and guided meditations on-demand. Interface design,
      mockups, and prototyping was done with Figma. 112 beautiful illustrations
      were produced with Midjourney and Photoshop for each of the practices.
    </p>
    <p>
      A selection of free practices are available, with the full library
      available for purchase through the App Store and Google Play. Launching in
      Fall 2024, the VBT App combines ancient wisdom with modern technology,
      offering a practical, accessible way to explore the rich teachings of the
      Vijñāna Bhairava Tantra.
    </p>
  </>,
  'UX / UI Design, Developer, Artwork',
  [
    collaborator(
      'Dr. Christopher Wallace',
      'https://www.tantrailluminated.org/christopher-hareesh-wallis',
    ),
    collaborator('Antoine Sakho', 'https://sakho.me'),
  ],
)
