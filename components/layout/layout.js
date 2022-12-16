import React from 'react';
import Head from 'next/head';

const Layout = (props) => {

    return (
        <div>
            <Head>
                <title>{props.pageTitle}</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="apple-touch-icon" sizes="180x180"
                      href="/static/images/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32"
                          href="/static/images/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16"
                              href="/static/images/favicons/favicon-16x16.png" />
            </Head>
            <div>
            
            {props.children}

            </div>


        </div>
    );
}

export default Layout;