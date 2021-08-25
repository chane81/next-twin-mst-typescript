import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCritical } from '@emotion/server';

interface IEmotionCss {
  ids: Array<string>;
  css: string;
}

export default class MyDocument extends Document<IEmotionCss> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
