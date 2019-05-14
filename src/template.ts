interface Template {
  body: string
  title?: string
  ogDescription?: string
  ogImg?: string
}

export default ({
  body,
  title='alec molloy dot com',
  ogDescription='the official web presence of alec molloy™',
  ogImg='http://alecmolloy.com/favicon.png',
}: Template ) => {
  return `
    <!DOCTYPE html>
    <html lang='en'>
      <head>
        <title>${title}</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='${ogDescription}' />
        <meta name='og:image' content='${ogImg}' />
        <link rel='icon' type='img=png' href='/favicon.png' />
        <link rel='stylesheet' type='text/css' href='/css/stylesheet.css' />
        <script async src='https://www.googletagmanager.com/gtag/js?id=UA-20430545-1'></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-20430545-1');
        </script>
      </head>
      <body>
        <div id='root'>
          ${body}
        </div>
      </body>
      <script src='/bundle.js'></script>
    </html>
  `
}
