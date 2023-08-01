import { Head, Html, Main, NextScript } from 'next/document'
import { defaultThemeState } from '../states/themeState'

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `var main=function(){try{var t=JSON.parse(localStorage.getItem("theme")||"{}"),e=(null==t?void 0:t.mode)||${defaultThemeState.mode},a=(null==t?void 0:t.genericFontFamily)||${defaultThemeState.genericFontFamily},i=document.querySelector("html");i.setAttribute("data-theme",e),i.setAttribute("data-font-family",a)}catch(n){}};main();`,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
